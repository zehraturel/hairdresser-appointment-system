import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdminPage.css";

const AdminPage = () => {
  const [adminName, setAdminName] = useState("");
  const [selectedFunction, setSelectedFunction] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [kuaforler, setKuaforler] = useState([]);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedKuaforId, setSelectedKuaforId] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isFetched, setIsFetched] = useState(false);
  const [services, setServices] = useState([]);
  const [odemeYontemleri, setOdemeYontemleri] = useState([]); // Ödeme Yöntemleri için state
  const [odemeDurumlari, setOdemeDurumlari] = useState([]); // Ödeme Durumları için state

  const [newService, setNewService] = useState({
    ad: "",
    aciklama: "",
    fiyat: "",
    sure: "",
  });
  const [payments, setPayments] = useState([]);
  const [newPayment, setNewPayment] = useState({
    musteriId: "",
    islemId: "",
    ucret: "",
    odemeYontemi: "",
    odemeDurumu: "",
    not: "",
    kullaniciId: "",
    randevuId: "",
    kuaforId: "",
    odemeTarihi: ""
  });

  
  

  useEffect(() => {
    fetchAdminInfo();
    fetchOdemeYontemleri();
    fetchOdemeDurumlari();
    if (selectedFunction === "appointments") {
      fetchKuaforler();
    } else if (selectedFunction === "users") {
      fetchUsers();
    } else if (selectedFunction === "services") {
      fetchServices();
    } else if (selectedFunction === "payments") {
      fetchPayments();
    }
  }, [selectedFunction]);

  const fetchAdminInfo = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) return console.error("JWT token eksik.");
    try {
      const response = await axios.get("/admin/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAdminName(response.data.ad);
    } catch (error) {
      console.error("Admin bilgileri alınamadı:", error);
    }
  };

  const fetchOdemeYontemleri = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      console.error("JWT token eksik.");
      return;
    }
    try {
      const response = await axios.get("/odeme/yontemler", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOdemeYontemleri(response.data);
    } catch (error) {
      console.error("Ödeme yöntemleri alınamadı:", error);
    }
  };
  
  
  const fetchOdemeDurumlari = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      console.error("JWT token eksik.");
      return;
    }
    try {
      const response = await axios.get("/odeme/durumlar", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOdemeDurumlari(response.data);
    } catch (error) {
      console.error("Ödeme durumları alınamadı:", error);
    }
  };
  
  

  const fetchKuaforler = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) return console.error("JWT token eksik.");
    try {
      const response = await axios.get("/admin/kuaforler", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setKuaforler(response.data);
    } catch (error) {
      console.error("Kuaför bilgileri alınamadı:", error);
    }
  };

  const fetchUsers = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) return console.error("JWT token eksik.");
    try {
      const response = await axios.get("/admin/kullanicilar", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(response.data);
      setFilteredUsers(response.data);
    } catch (error) {
      console.error("Kullanıcılar alınamadı:", error);
    }
  };

  const fetchAppointments = async () => {
    setIsFetched(false);
    const token = localStorage.getItem("authToken");
    if (!token) return console.error("JWT token eksik.");
    if (!selectedKuaforId || !selectedDate) {
      setFeedback("");
      return;
    }
    try {
      const response = await axios.get("/admin/randevular", {
        params: { kuaforId: selectedKuaforId, tarih: selectedDate },
        headers: { Authorization: `Bearer ${token}` },
      });
      setAppointments(response.data);
      setFeedback(
        response.data.length === 0
          ? "Seçilen tarih ve kuaför için randevu bulunamadı."
          : ""
      );
      setIsFetched(true);
    } catch (error) {
      console.error("Randevular alınamadı:", error);
      setFeedback("Randevular alınırken bir hata oluştu.");
      setAppointments([]);
      setIsFetched(true);
    }
  };

  const fetchServices = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) return console.error("JWT token eksik.");
    try {
      const response = await axios.get("/hizmet/list", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setServices(response.data);
    } catch (error) {
      console.error("Hizmetler alınamadı:", error);
    }
  };

  const fetchPayments = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) return console.error("JWT token eksik.");
    try {
      const response = await axios.get("/odeme/admin/listele", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPayments(response.data);
    } catch (error) {
      console.error("Ödemeler alınamadı:", error);
    }
  };
  

  const addService = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) return console.error("JWT token eksik.");
    try {
      await axios.post("/hizmet/ekle", newService, {
        headers: { Authorization: `Bearer ${token}` },
      });
      await fetchServices();
      setNewService({ ad: "", aciklama: "", fiyat: "", sure: "" });
    } catch (error) {
      console.error("Hizmet eklenirken hata oluştu:", error);
    }
  };

  const deleteService = async (id) => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      console.error("JWT token eksik.");
      return;
    }
    if (!id) {
      console.error("Geçersiz hizmet ID:", id);
      alert("Hizmet ID tanımlı değil.");
      return;
    }
    try {
      await axios.delete(`/hizmet/sil/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setServices((prevServices) =>
        prevServices.filter((service) => service.hizmetId !== id)
      );
      console.log(`Hizmet ${id} başarıyla silindi.`);
    } catch (error) {
      console.error("Hizmet silinirken hata oluştu:", error.response.data);
      alert("Hizmet silinirken bir hata oluştu: " + error.response.data);
    }
  };

  const addPayment = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) return console.error("JWT token eksik.");
    try {
      const response = await axios.post("/odeme/admin/ekle", newPayment, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPayments((prev) => [...prev, response.data]);
      setNewPayment({
        musteri: "",
        islem: "",
        ucret: "",
        odemeYontemi: "",
        odemeDurumu: "",
        not: "",
        kullaniciId: "",
        randevuId: "",
        kuaforId: "",
      });
      alert("Ödeme başarıyla eklendi!");
    } catch (error) {
      console.error("Ödeme eklenirken hata oluştu:", error);
    }
  };
  

  return (
    <div className="admin-page">
      <header>
        <h1>👋Merhaba, {adminName || "Admin"}</h1>
      </header>
      <div className="button-container">
        <button onClick={() => setSelectedFunction("appointments")}>
          Randevular
        </button>
        <button onClick={() => setSelectedFunction("users")}>Kullanıcılar</button>
        <button onClick={() => setSelectedFunction("services")}>Hizmetler</button>
        <button onClick={() => setSelectedFunction("payments")}>Ödemeler</button>
      </div>

      {selectedFunction === "appointments" && (
        <div className="appointments-container">
          <h2>Randevular</h2>
          <div className="filter-container">
            <div className="filter-item">
              <label>Kuaför Seçin:</label>
              <select
                value={selectedKuaforId}
                onChange={(e) => setSelectedKuaforId(e.target.value)}
              >
                <option value="">Kuaför Seç</option>
                {kuaforler.map((kuafor) => (
                  <option key={kuafor.kuaforId} value={kuafor.kuaforId}>
                    {kuafor.ad} {kuafor.soyad}
                  </option>
                ))}
              </select>
            </div>
            <div className="filter-item">
              <label>Tarih Seçin:</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>
            <div className="filter-item">
              <button onClick={fetchAppointments}>Randevuları Getir</button>
            </div>
          </div>
          <div className="list-container">
            <table>
              <thead>
                <tr>
                  <th>Saat</th>
                  <th>Müşteri</th>
                  <th>Telefon</th>
                  <th>İşlem</th>
                  <th>Ücret</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appt) => (
                  <tr key={appt.id}>
                    <td>{appt.saat}</td>
                    <td>{appt.adSoyad}</td>
                    <td>{appt.telefon}</td>
                    <td>{appt.islem}</td>
                    <td>{appt.ucret} ₺</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {selectedFunction === "users" && (
        <div className="user-container">
          <h2>Kullanıcılar</h2>
          <div className="search-container">
            <input
              type="text"
              placeholder="Kullanıcı ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-bar"
            />
          </div>
          <div className="list-container">
            <table>
              <thead>
                <tr>
                  <th>Ad</th>
                  <th>Soyad</th>
                  <th>Email</th>
                  <th>Telefon</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td>{user.ad}</td>
                    <td>{user.soyad}</td>
                    <td>{user.email}</td>
                    <td>{user.telefon}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {selectedFunction === "services" && (
        <div className="service-container">
          <h2>Hizmetler</h2>
          <div className="service-form">
            <input
              type="text"
              placeholder="Hizmet Adı"
              value={newService.ad}
              onChange={(e) =>
                setNewService({ ...newService, ad: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Açıklama"
              value={newService.aciklama}
              onChange={(e) =>
                setNewService({ ...newService, aciklama: e.target.value })
              }
            />
            <input
              type="number"
              placeholder="Fiyat"
              value={newService.fiyat}
              onChange={(e) =>
                setNewService({ ...newService, fiyat: e.target.value })
              }
            />
            <input
              type="number"
              placeholder="Süre (dk)"
              value={newService.sure}
              onChange={(e) =>
                setNewService({ ...newService, sure: e.target.value })
              }
            />
            <button onClick={addService}>Hizmet Ekle</button>
          </div>
          <div className="list-container">
            <table>
              <thead>
                <tr>
                  <th>Ad</th>
                  <th>Açıklama</th>
                  <th>Fiyat</th>
                  <th>Süre</th>
                  <th>Sil</th>
                </tr>
              </thead>
              <tbody>
                {services.map((service) => (
                  <tr key={service.hizmetId}>
                    <td>{service.ad}</td>
                    <td>{service.aciklama}</td>
                    <td>{service.fiyat} ₺</td>
                    <td>{service.sure} dk</td>
                    <td>
                      <button onClick={() => deleteService(service.hizmetId)}>🗑️</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

{selectedFunction === "payments" && (
  <div className="payments-container">
    <h2>Ödemeler</h2>
    <div className="payment-form">
      <input
        type="number"
        placeholder="Kullanıcı ID"
        value={newPayment.kullaniciId}
        onChange={(e) => setNewPayment({ ...newPayment, kullaniciId: e.target.value })}
      />
      <input
        type="number"
        placeholder="Kuaför ID"
        value={newPayment.kuaforId}
        onChange={(e) => setNewPayment({ ...newPayment, kuaforId: e.target.value })}
      />
      <input
        type="number"
        placeholder="Randevu ID"
        value={newPayment.randevuId}
        onChange={(e) => setNewPayment({ ...newPayment, randevuId: e.target.value })}
      />
      <input
        type="number"
        placeholder="Ücret"
        value={newPayment.ucret}
        onChange={(e) => setNewPayment({ ...newPayment, ucret: e.target.value })}
      />
      <select
  value={newPayment.odemeYontemi}
  onChange={(e) =>
    setNewPayment({ ...newPayment, odemeYontemi: e.target.value })
  }
>
  <option value="">Ödeme Yöntemi Seçin</option>
  {odemeYontemleri.map((yontem, index) => (
    <option key={index} value={yontem}>
      {yontem}
    </option>
  ))}
</select>

<select
  value={newPayment.odemeDurumu}
  onChange={(e) =>
    setNewPayment({ ...newPayment, odemeDurumu: e.target.value })
  }
>
  <option value="">Ödeme Durumu Seçin</option>
  {odemeDurumlari.map((durum, index) => (
    <option key={index} value={durum}>
      {durum}
    </option>
  ))}
</select>


      <textarea
        placeholder="Açıklama"
        value={newPayment.aciklama}
        onChange={(e) => setNewPayment({ ...newPayment, aciklama: e.target.value })}
      />
      <label>Tarih Seçin:</label>
      <input
        type="datetime-local"
        value={newPayment.odemeTarihi}
        onChange={(e) =>
          setNewPayment({ ...newPayment, odemeTarihi: e.target.value })
        }
      />
      <button onClick={addPayment}>Ödeme Ekle</button>
    </div>

    <div className="list-container">
  <table>
    <thead>
      <tr>
        <th>Müşteri</th>
        <th>İşlem</th>
        <th>Ücret</th>
        <th>Ödeme Yöntemi</th>
        <th>Durum</th>
        <th>Açıklama</th>
      </tr>
    </thead>
    <tbody>
      {payments.map((payment, index) => (
        <tr key={index}>
          <td>{payment.adSoyad || "Müşteri Bilgisi Eksik"}</td>
          <td>{payment.islem || "İşlem Bilgisi Eksik"}</td>
          <td>{payment.tutar ? `${payment.tutar} ₺` : "Ücret Bilgisi Eksik"}</td>
          <td>{payment.odemeYontemi || "Yöntem Bilgisi Eksik"}</td>
          <td>{payment.durum || "Durum Bilgisi Eksik"}</td>
          <td>{payment.aciklama || "Açıklama Yok"}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

  </div>
)}

    </div>
  );
};

export default AdminPage;


