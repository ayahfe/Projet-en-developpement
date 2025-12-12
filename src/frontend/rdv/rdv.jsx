// src/frontend/rdv/rdv.jsx
import { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient";
import { useAuth } from "../AuthContext";
import {
  Calendar,
  Plus,
  X,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import "./rdv.css";

export default function CalendrierRdv() {
  const { user } = useAuth();

  const [appointments, setAppointments] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const [newAppointment, setNewAppointment] = useState({
    patient_name: "",
    email: "",
    doctor_name: "",
    date: "",
    time: "",
    status: "upcoming",
  });

  const medecins = [
    "Dr. Amal El Idrissi",
    "Dr. Youssef Bennani",
    "Dr. Laila Ouarzazi",
    "Dr. Karim Ait Lahcen",
    "Dr. Fatima Zahra Bensalem"
  ];

  useEffect(() => {
    fetchAppointments();
  }, []);

  async function fetchAppointments() {
    const { data, error } = await supabase
      .from("appointments")
      .select("*")
      .order("date", { ascending: true });

    if (!error) setAppointments(data || []);
  }

  function normalizeStatus(raw) {
    if (!raw) return "upcoming";
    const s = String(raw).toLowerCase();
    if (s.includes("annul") || s.includes("cancel")) return "cancelled";
    if (s.includes("fini") || s.includes("finished")) return "finished";
    if (s.includes("cours") || s.includes("progress")) return "in-progress";
    return "upcoming";
  }

  function statusMeta(raw) {
    switch (normalizeStatus(raw)) {
      case "cancelled": return { cls: "cancelled", label: "Annulé" };
      case "finished": return { cls: "finished", label: "Terminé" };
      case "in-progress": return { cls: "in-progress", label: "En cours" };
      default: return { cls: "upcoming", label: "À venir" };
    }
  }

  async function handleAddAppointment(e) {
    e.preventDefault();
    const payload = { ...newAppointment, status: "upcoming" };

    const { data, error } = await supabase
      .from("appointments")
      .insert([payload])
      .select();

    if (!error) {
      setAppointments([...appointments, data[0]]);
      setShowForm(false);
      setNewAppointment({
        patient_name: "",
        email: "",
        doctor_name: "",
        date: "",
        time: "",
        status: "upcoming",
      });
    }
  }

  const navigateWeek = (dir) => {
    const d = new Date(currentDate);
    d.setDate(d.getDate() + dir * 7);
    setCurrentDate(d);
  };

  const getDaysInWeek = () => {
    const start = new Date(currentDate);
    start.setDate(start.getDate() - start.getDay() + 1);
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      return d;
    });
  };

  const getAppointmentsForDay = (date) => {
    const dateStr = date.toISOString().split("T")[0];
    return appointments.filter((a) => a.date === dateStr);
  };

  const hours = Array.from({ length: 13 }, (_, i) => i + 8);
  const showLoginBanner = !user;

  return (
    <div className="calendar-container">

      {showLoginBanner && (
        <div className="login-warning">
          Vous pouvez consulter le calendrier, mais vous devez vous connecter pour créer un rendez-vous.
        </div>
      )}

      <div className="calendar-header">
        <h1 className="calendar-title">
          <Calendar size={26} /> Calendrier des Rendez-vous
        </h1>
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={() => navigateWeek(-1)} className="btn-nav"><ChevronLeft size={16} /></button>
          <button onClick={() => navigateWeek(1)} className="btn-nav"><ChevronRight size={16} /></button>

          {user ? (
            <button onClick={() => setShowForm(true)} className="btn-primary">
              <Plus size={18} /> Nouveau RDV
            </button>
          ) : (
            <button
              className="btn-primary"
              style={{ opacity: 0.5, cursor: "not-allowed" }}
              onClick={() => alert("Veuillez vous connecter")}
            >
              <Plus size={18} /> Nouveau RDV
            </button>
          )}
        </div>
      </div>

      <div className="calendar-grid">
        <div className="grid-header">
          <div></div>
          {getDaysInWeek().map((day) => (
            <div key={day.toISOString()}>
              {day.toLocaleDateString("fr-CA", { weekday: "short", day: "numeric" })}
            </div>
          ))}
        </div>

        {hours.map((hour) => (
          <div key={hour} className="grid-row">
            <div className="grid-hour">{hour}:00</div>
            {getDaysInWeek().map((day) => (
              <div key={day.toISOString()} className="grid-cell">
                {getAppointmentsForDay(day)
                  .filter(a => a.time && parseInt(a.time.split(":")[0]) === hour)
                  .map((apt) => {
                    const meta = statusMeta(apt.status);
                    return (
                      <div
                        key={apt.id}
                        className={`apt-card ${meta.cls}`}
                        data-status-label={meta.label}
                        onClick={() => setSelectedAppointment(apt)}
                      >
                        <div className="apt-time">{apt.time}</div>
                        <div className="apt-name">{apt.patient_name}</div>
                        <div className="apt-doctor">{apt.doctor_name}</div>
                      </div>
                    );
                  })}
              </div>
            ))}
          </div>
        ))}
      </div>

      {showForm && user && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <form onSubmit={handleAddAppointment} className="form-rdv">
              <h2>Nouveau Rendez-vous</h2>
              <input required placeholder="Nom patient"
                value={newAppointment.patient_name}
                onChange={e => setNewAppointment({ ...newAppointment, patient_name: e.target.value })}
              />
              <input required type="email" placeholder="Email"
                value={newAppointment.email}
                onChange={e => setNewAppointment({ ...newAppointment, email: e.target.value })}
              />
              <select required
                value={newAppointment.doctor_name}
                onChange={e => setNewAppointment({ ...newAppointment, doctor_name: e.target.value })}
              >
                <option value="">Choisir un médecin</option>
                {medecins.map((d, i) => <option key={i}>{d}</option>)}
              </select>
              <input required type="date"
                value={newAppointment.date}
                onChange={e => setNewAppointment({ ...newAppointment, date: e.target.value })}
              />
              <input required type="time"
                value={newAppointment.time}
                onChange={e => setNewAppointment({ ...newAppointment, time: e.target.value })}
              />
              <button type="submit" className="btn-primary">Enregistrer</button>
            </form>
          </div>
        </div>
      )}

      {selectedAppointment && (
        <div className="modal-overlay" onClick={() => setSelectedAppointment(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Détails</h2>
            <p>{selectedAppointment.patient_name}</p>
            <p>{selectedAppointment.email}</p>
            <p>{selectedAppointment.doctor_name}</p>
            <p>{selectedAppointment.date} — {selectedAppointment.time}</p>
          </div>
        </div>
      )}
    </div>
  );
}
