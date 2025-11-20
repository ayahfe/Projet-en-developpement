<<<<<<< HEAD
<<<<<<< HEAD
import { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient";
=======
=======
>>>>>>> origin/temp-visualiser-fix
// src/frontend/rdv/CalendrierRdv.jsx
import { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient";
import { useAuth } from "../AuthContext";
<<<<<<< HEAD
>>>>>>> af96563 ([Add] Addition des fichiers Cart.jsx, CartContext et Cart.css et stripe.js)
=======
>>>>>>> origin/temp-visualiser-fix
import {
  Calendar,
  Plus,
  X,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import "./rdv.css";

export default function CalendrierRdv() {
<<<<<<< HEAD
<<<<<<< HEAD
=======
  const { user } = useAuth(); // ✅ récupère l’utilisateur connecté

>>>>>>> af96563 ([Add] Addition des fichiers Cart.jsx, CartContext et Cart.css et stripe.js)
=======
  const { user } = useAuth(); // récupère l’utilisateur connecté

>>>>>>> origin/temp-visualiser-fix
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

    if (error) {
      console.error("Erreur Supabase :", error);
    } else {
      setAppointments(data || []);
    }
  }

  function normalizeStatus(raw) {
    if (!raw) return "upcoming";
    const s = String(raw).toLowerCase();
    if (s.includes("annul") || s.includes("cancel")) return "cancelled";
    if (s.includes("fini") || s.includes("finished") || s.includes("completed")) return "finished";
    if (s.includes("en cours") || s.includes("in-progress") || s.includes("progress")) return "in-progress";
<<<<<<< HEAD
<<<<<<< HEAD
    if (s.includes("à venir") || s.includes("pas encore") || s.includes("upcoming") || s.includes("pending")) return "upcoming";
=======
>>>>>>> af96563 ([Add] Addition des fichiers Cart.jsx, CartContext et Cart.css et stripe.js)
=======
>>>>>>> origin/temp-visualiser-fix
    return "upcoming";
  }

  function statusMeta(raw) {
    const s = normalizeStatus(raw);
    switch (s) {
<<<<<<< HEAD
<<<<<<< HEAD
      case "cancelled": return { cls: "cancelled", label: "" };
      case "finished": return { cls: "finished", label: "" };
      case "in-progress": return { cls: "in-progress", label: "" };
      default: return { cls: "upcoming", label: "" };
=======
=======
>>>>>>> origin/temp-visualiser-fix
      case "cancelled": return { cls: "cancelled", label: "Annulé" };
      case "finished": return { cls: "finished", label: "Terminé" };
      case "in-progress": return { cls: "in-progress", label: "En cours" };
      default: return { cls: "upcoming", label: "À venir" };
<<<<<<< HEAD
>>>>>>> af96563 ([Add] Addition des fichiers Cart.jsx, CartContext et Cart.css et stripe.js)
=======
>>>>>>> origin/temp-visualiser-fix
    }
  }

  async function handleAddAppointment(e) {
    e.preventDefault();
<<<<<<< HEAD
<<<<<<< HEAD
    const payload = { ...newAppointment, status: "upcoming" }; // statut auto
=======
    const payload = { ...newAppointment, status: "upcoming" };
>>>>>>> af96563 ([Add] Addition des fichiers Cart.jsx, CartContext et Cart.css et stripe.js)
=======
    const payload = { ...newAppointment, status: "upcoming" };

>>>>>>> origin/temp-visualiser-fix
    const { data, error } = await supabase
      .from("appointments")
      .insert([payload])
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
        status: "upcoming",
      });
    }
  }

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

<<<<<<< HEAD
<<<<<<< HEAD
=======
  // ✅ Si pas connecté → bloque l’accès au calendrier complet
  if (!user) {
    return (
      <div className="calendar-container" style={{ textAlign: "center", paddingTop: "140px" }}>
        <h2>🔒 Vous devez être connecté pour accéder au calendrier des rendez-vous.</h2>
        <p>Veuillez vous connecter ou créer un compte avant de réserver un créneau.</p>
      </div>
    );
  }

>>>>>>> af96563 ([Add] Addition des fichiers Cart.jsx, CartContext et Cart.css et stripe.js)
  return (
    <div className="calendar-container">
=======
  // 🔵 On affiche quand même tout le calendrier
  const showLoginBanner = !user;

  return (
    <div className="calendar-container">

      {/* 🔵 MESSAGE INFO SI PAS CONNECTÉ */}
      {showLoginBanner && (
        <div className="login-warning">
          Vous n'êtes pas connecté — vous pouvez consulter le calendrier, 
          mais vous devez vous connecter pour prendre un rendez-vous.
        </div>
      )}

      {/* HEADER */}
>>>>>>> origin/temp-visualiser-fix
      <div className="calendar-header">
        <h1 className="calendar-title">
          <div className="calendar-icon"><Calendar size={26} /></div>
          Calendrier des Rendez-vous
        </h1>
<<<<<<< HEAD
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={() => navigateWeek(-1)} className="btn-nav"><ChevronLeft size={16} /></button>
          <button onClick={() => navigateWeek(1)} className="btn-nav"><ChevronRight size={16} /></button>
<<<<<<< HEAD
          <button onClick={() => setShowForm(true)} className="btn-primary">
            <Plus size={18} /> Nouveau RDV
          </button>
=======

          {/* ✅ Bouton grisé si pas connecté */}
=======

        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={() => navigateWeek(-1)} className="btn-nav"><ChevronLeft size={16} /></button>
          <button onClick={() => navigateWeek(1)} className="btn-nav"><ChevronRight size={16} /></button>

          {/* BOUTON AJOUT RDV */}
>>>>>>> origin/temp-visualiser-fix
          {user ? (
            <button onClick={() => setShowForm(true)} className="btn-primary">
              <Plus size={18} /> Nouveau RDV
            </button>
          ) : (
            <button
              className="btn-primary"
<<<<<<< HEAD
              style={{ opacity: 0.6, cursor: "not-allowed" }}
=======
              style={{ opacity: 0.5, cursor: "not-allowed" }}
>>>>>>> origin/temp-visualiser-fix
              onClick={() => alert("Veuillez vous connecter pour prendre un rendez-vous.")}
            >
              <Plus size={18} /> Nouveau RDV
            </button>
          )}
<<<<<<< HEAD
>>>>>>> af96563 ([Add] Addition des fichiers Cart.jsx, CartContext et Cart.css et stripe.js)
        </div>
      </div>

=======
        </div>
      </div>

      {/* GRID DU CALENDRIER */}
>>>>>>> origin/temp-visualiser-fix
      <div className="calendar-grid">
        <div className="grid-header">
          <div></div>
          {getDaysInWeek().map((day) => (
            <div key={day.toISOString()}>
              {day.toLocaleDateString("fr-CA", { weekday: "short", day: "numeric" })}
            </div>
          ))}
        </div>
<<<<<<< HEAD
        {hours.map((hour) => (
          <div key={hour} className="grid-row">
            <div className="grid-hour">{hour}:00</div>
=======

        {hours.map((hour) => (
          <div key={hour} className="grid-row">
            <div className="grid-hour">{hour}:00</div>

>>>>>>> origin/temp-visualiser-fix
            {getDaysInWeek().map((day) => {
              const dayApps = getAppointmentsForDay(day).filter(
                (apt) => apt.time && parseInt(apt.time.split(":")[0]) === hour
              );
<<<<<<< HEAD
=======

>>>>>>> origin/temp-visualiser-fix
              return (
                <div key={day.toISOString()} className="grid-cell">
                  {dayApps.map((apt) => {
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
              );
            })}
          </div>
        ))}
      </div>

<<<<<<< HEAD
<<<<<<< HEAD
      {/* Formulaire d’ajout */}
=======
      {/* Modal ajout RDV */}
>>>>>>> af96563 ([Add] Addition des fichiers Cart.jsx, CartContext et Cart.css et stripe.js)
      {showForm && (
=======
      {/* MODAL AJOUT RDV */}
      {showForm && user && (
>>>>>>> origin/temp-visualiser-fix
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Nouveau Rendez-vous</h2>
              <button onClick={() => setShowForm(false)} className="btn-close">
                <X size={20} />
              </button>
            </div>
<<<<<<< HEAD
=======

>>>>>>> origin/temp-visualiser-fix
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

<<<<<<< HEAD
<<<<<<< HEAD
              {/* Liste déroulante des médecins */}
=======
>>>>>>> af96563 ([Add] Addition des fichiers Cart.jsx, CartContext et Cart.css et stripe.js)
=======
>>>>>>> origin/temp-visualiser-fix
              <select
                value={newAppointment.doctor_name}
                onChange={(e) =>
                  setNewAppointment({ ...newAppointment, doctor_name: e.target.value })
                }
                required
<<<<<<< HEAD
<<<<<<< HEAD
                style={{
                  width: "100%",
                  height: 44,
                  padding: "0.5rem 0.75rem",
                  borderRadius: 8,
                  border: "1px solid #e2e8f0",
                  background: "white",
                  fontSize: "0.95rem",
                  color: "black" // 🖤 texte noir
                }}
=======
>>>>>>> af96563 ([Add] Addition des fichiers Cart.jsx, CartContext et Cart.css et stripe.js)
=======
>>>>>>> origin/temp-visualiser-fix
              >
                <option value="">Choisir un médecin</option>
                {medecins.map((doc, i) => (
                  <option key={i} value={doc}>{doc}</option>
                ))}
              </select>

              <div className="form-rdv-row">
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
              </div>

<<<<<<< HEAD
<<<<<<< HEAD
              {/* 🔸 Le champ statut est retiré du formulaire (auto à upcoming) */}

=======
>>>>>>> af96563 ([Add] Addition des fichiers Cart.jsx, CartContext et Cart.css et stripe.js)
=======
>>>>>>> origin/temp-visualiser-fix
              <button type="submit" className="btn-primary">
                Enregistrer
              </button>
            </form>
          </div>
        </div>
      )}

<<<<<<< HEAD
<<<<<<< HEAD
=======
      {/* Modal détails RDV */}
>>>>>>> af96563 ([Add] Addition des fichiers Cart.jsx, CartContext et Cart.css et stripe.js)
=======
      {/* MODAL DÉTAILS RDV */}
>>>>>>> origin/temp-visualiser-fix
      {selectedAppointment && (
        <div className="modal-overlay" onClick={() => setSelectedAppointment(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Détails du Rendez-vous</h2>
              <button onClick={() => setSelectedAppointment(null)} className="btn-close">
                <X size={20} />
              </button>
            </div>
<<<<<<< HEAD
            <div className="modal-content">
<<<<<<< HEAD
              <p><strong>Patient :</strong> {selectedAppointment.patient_name}</p>
              <p><strong>Email :</strong> {selectedAppointment.email}</p>
              <p><strong>Médecin :</strong> {selectedAppointment.doctor_name}</p>
              <p><strong>Date :</strong> {selectedAppointment.date}</p>
              <p><strong>Heure :</strong> {selectedAppointment.time}</p>
              <p><strong>Statut :</strong> {statusMeta(selectedAppointment.status).label}</p>
=======
=======

            <div className="modal-content">
>>>>>>> origin/temp-visualiser-fix
              <div className="detail-item">
                <span className="detail-label">👤 Patient :</span>
                <span className="detail-value">{selectedAppointment.patient_name}</span>
              </div>
<<<<<<< HEAD
=======

>>>>>>> origin/temp-visualiser-fix
              <div className="detail-item">
                <span className="detail-label">✉️ Email :</span>
                <span className="detail-value">{selectedAppointment.email}</span>
              </div>
<<<<<<< HEAD
=======

>>>>>>> origin/temp-visualiser-fix
              <div className="detail-item">
                <span className="detail-label">🩺 Médecin :</span>
                <span className="detail-value">{selectedAppointment.doctor_name}</span>
              </div>
<<<<<<< HEAD
=======

>>>>>>> origin/temp-visualiser-fix
              <div className="detail-item">
                <span className="detail-label">📅 Date :</span>
                <span className="detail-value">{selectedAppointment.date}</span>
              </div>
<<<<<<< HEAD
=======

>>>>>>> origin/temp-visualiser-fix
              <div className="detail-item">
                <span className="detail-label">⏰ Heure :</span>
                <span className="detail-value">{selectedAppointment.time}</span>
              </div>
<<<<<<< HEAD
=======

>>>>>>> origin/temp-visualiser-fix
              <div className="detail-item">
                <span className="detail-label">📌 Statut :</span>
                <span className={`status-badge ${statusMeta(selectedAppointment.status).cls}`}>
                  {statusMeta(selectedAppointment.status).label}
                </span>
              </div>
<<<<<<< HEAD
>>>>>>> af96563 ([Add] Addition des fichiers Cart.jsx, CartContext et Cart.css et stripe.js)
=======
>>>>>>> origin/temp-visualiser-fix
            </div>
          </div>
        </div>
      )}
<<<<<<< HEAD
=======

>>>>>>> origin/temp-visualiser-fix
    </div>
  );
}
