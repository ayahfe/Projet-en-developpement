import { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient"; // adapte le chemin selon ton dossier
import {
  Calendar,
  Clock,
  User,
  MapPin,
  Plus,
  X,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import "./rdv.css";

export default function CalendrierRdv() {
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
  });

  useEffect(() => {
    fetchAppointments();
  }, []);

  // 🔹 Lecture depuis Supabase
  async function fetchAppointments() {
    const { data, error } = await supabase
      .from("appointments")
      .select("*")
      .order("date", { ascending: true });

    if (error) {
      console.error("Erreur Supabase :", error);
    } else {
      setAppointments(data);
    }
  }

  // 🔹 Ajout d’un nouveau RDV
  async function handleAddAppointment(e) {
    e.preventDefault();

    const { data, error } = await supabase
      .from("appointments")
      .insert([newAppointment])
      .select();

    if (error) {
      alert("Erreur : " + error.message);
      console.error(error);
    } else {
      setAppointments([...appointments, data[0]]);
      setShowForm(false);
      setNewAppointment({
        patient_name: "",
        email: "",
        doctor_name: "",
        date: "",
        time: "",
      });
    }
  }

  // 📅 Gestion du calendrier
  const navigateWeek = (dir) => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + dir * 7);
    setCurrentDate(newDate);
  };

  const getDaysInWeek = () => {
    const start = new Date(currentDate);
    start.setDate(currentDate.getDate() - currentDate.getDay() + 1);
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

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <h1 className="calendar-title">
          <div className="calendar-icon"><Calendar size={26} /></div>
          Calendrier des Rendez-vous
        </h1>
        <button onClick={() => setShowForm(true)} className="btn-primary">
          <Plus size={18} /> Nouveau RDV
        </button>
      </div>

      {/* Grille semaine */}
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
            {getDaysInWeek().map((day) => {
              const dayApps = getAppointmentsForDay(day).filter(
                (apt) => parseInt(apt.time.split(":")[0]) === hour
              );
              return (
                <div key={day.toISOString()} className="grid-cell">
                  {dayApps.map((apt) => (
                    <div
                      key={apt.id}
                      className="apt-card"
                      onClick={() => setSelectedAppointment(apt)}
                    >
                      <div className="apt-time">{apt.time}</div>
                      <div className="apt-name">{apt.patient_name}</div>
                      <div className="apt-doctor">{apt.doctor_name}</div>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Formulaire d’ajout */}
      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Nouveau Rendez-vous</h2>
              <button onClick={() => setShowForm(false)} className="btn-close">
                <X size={20} />
              </button>
            </div>
           <form onSubmit={handleAddAppointment} className="form-rdv">
  <div className="form-rdv-row">
    <input
      type="text"
      placeholder="Nom complet du patient"
      value={newAppointment.patient_name}
      onChange={(e) =>
        setNewAppointment({ ...newAppointment, patient_name: e.target.value })
      }
      required
    />
    <input
      type="email"
      placeholder="Email du patient"
      value={newAppointment.email}
      onChange={(e) =>
        setNewAppointment({ ...newAppointment, email: e.target.value })
      }
      required
    />
  </div>

  <input
    type="text"
    placeholder="Nom du médecin"
    value={newAppointment.doctor_name}
    onChange={(e) =>
      setNewAppointment({ ...newAppointment, doctor_name: e.target.value })
    }
    required
  />
  <input
    type="date"
    value={newAppointment.date}
    onChange={(e) =>
      setNewAppointment({ ...newAppointment, date: e.target.value })
    }
    required
  />
  <input
    type="time"
    value={newAppointment.time}
    onChange={(e) =>
      setNewAppointment({ ...newAppointment, time: e.target.value })
    }
    required
  />
  <button type="submit" className="btn-primary">
    Enregistrer
  </button>
</form>

          </div>
        </div>
      )}

      {/* Modal de détail */}
      {selectedAppointment && (
        <div className="modal-overlay" onClick={() => setSelectedAppointment(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Détails du Rendez-vous</h2>
              <button onClick={() => setSelectedAppointment(null)} className="btn-close">
                <X size={20} />
              </button>
            </div>
            <div className="modal-content">
              <p><strong>Patient :</strong> {selectedAppointment.patient_name}</p>
              <p><strong>Email :</strong> {selectedAppointment.email}</p>
              <p><strong>Médecin :</strong> {selectedAppointment.doctor_name}</p>
              <p><strong>Date :</strong> {selectedAppointment.date}</p>
              <p><strong>Heure :</strong> {selectedAppointment.time}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
