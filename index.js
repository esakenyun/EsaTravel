var toTopButton = document.getElementById("to-top-button");
// When the user scrolls down 200px from the top of the document, show the button
window.onscroll = function () {
  if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
    toTopButton.classList.remove("hidden");
  } else {
    toTopButton.classList.add("hidden");
  }
};

// When the user clicks on the button, scroll to the top of the document
function goToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Form JS
const namaInput = document.getElementById("name");

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const hargaTiket = {
  bali: 500000,
  malang: 400000,
  surabaya: 300000,
  yogyakarta: 350000,
  jepara: 450000,
};

const destinasiInput = document.getElementById("destination");
const jumlahTiketInput = document.getElementById("NumberOfTicket");
const memberCheckbox = document.getElementById("terms");
const hargaTiketInput = document.getElementById("ticketprice");
const diskonInput = document.getElementById("diskon");
const totalHargaInput = document.getElementById("totalprice");

destinasiInput.addEventListener("change", function () {
  const destinasi = this.value.toLowerCase();
  const harga = hargaTiket[destinasi];

  if (harga) {
    hargaTiketInput.value = harga.toLocaleString();
  } else {
    hargaTiketInput.value = "";
  }
  hitungTotalHarga();
});

jumlahTiketInput.addEventListener("change", function () {
  hitungTotalHarga();
});

memberCheckbox.addEventListener("change", function () {
  hitungTotalHarga();
});

function hitungTotalHarga() {
  const destinasi = destinasiInput.value.toLowerCase();
  const harga = hargaTiket[destinasi];
  const jumlahTiket = parseInt(jumlahTiketInput.value, 10);
  const isMember = memberCheckbox.checked;
  let diskon = 0;

  if (destinasi && !isNaN(jumlahTiket) && jumlahTiket > 0) {
    if (isMember) {
      diskon = 0.2; // Diskon 20% jika member
    } else {
      diskon = 0.05; // Diskon 5% jika bukan member
    }

    const totalHarga = harga * jumlahTiket * (1 - diskon);
    diskonInput.value = (diskon * 100).toFixed(0) + "%";
    totalHargaInput.value = "Rp " + totalHarga.toLocaleString();
  } else {
    diskonInput.value = "";
    totalHargaInput.value = "";
  }
}
[namaInput, destinasiInput, jumlahTiketInput, memberCheckbox].forEach((input) => {
  input.addEventListener("input", function () {
    hitungTotalHarga();
    updateModalValues();
  });
});

function updateModalValues() {
  const destinasi = destinasiInput.value.toLowerCase();
  const harga = hargaTiket[destinasi];
  const jumlahTiket = parseInt(jumlahTiketInput.value, 10);
  const isMember = memberCheckbox.checked;
  let diskon = 0;

  if (destinasi && !isNaN(jumlahTiket) && jumlahTiket > 0) {
    if (isMember) {
      diskon = 0.2; // Diskon 20% jika member
    } else {
      diskon = 0.05; // Diskon 5% jika bukan member
    }

    const totalHarga = harga * jumlahTiket * (1 - diskon);
    diskonInput.value = (diskon * 100).toFixed(0) + "%";
    totalHargaInput.value = "Rp " + totalHarga.toLocaleString();
  } else {
    diskonInput.value = "";
    totalHargaInput.value = "";
  }

  const destinasiFormatted = capitalizeFirstLetter(destinasi);

  // Memperbarui nilai-nilai pada modal
  const modalName = document.getElementById("modalName");
  const modalDestination = document.getElementById("modalDestination");
  const modalTicketPrice = document.getElementById("modalTicketPrice");
  const modalNumberOfTicket = document.getElementById("modalNumberOfTicket");
  const modalMember = document.getElementById("modalMember");
  const modalDiscount = document.getElementById("modalDiscount");
  const modalTotalPrice = document.getElementById("modalTotalPrice");

  modalName.textContent = namaInput.value;
  modalDestination.textContent = destinasiFormatted;
  modalTicketPrice.textContent = `Rp ${harga}`;
  modalNumberOfTicket.textContent = jumlahTiket;
  modalMember.textContent = isMember ? "Yes" : "No";
  modalDiscount.textContent = (diskon * 100).toFixed(0) + "%";
  modalTotalPrice.textContent = `Rp ${totalHargaInput.value.replace("Rp ", "")}`;
}

// Mengambil elemen-elemen input
const nameInput = document.getElementById("name");
const destinationInput = document.getElementById("destination");
const numberOfTicketInput = document.getElementById("NumberOfTicket");
const checkoutButton = document.getElementById("checkoutButton");

[nameInput, destinationInput, numberOfTicketInput].forEach((input) => {
  input.addEventListener("input", function () {
    const isNameValid = nameInput.value.trim() !== "";
    const isDestinationValid = destinationInput.value.trim() !== "";
    const isNumberOfTicketValid = numberOfTicketInput.value.trim() !== "" && numberOfTicketInput.value > 0;

    // Memeriksa apakah semua input sudah terisi dan memungkinkan untuk mengaktifkan tombol Checkout
    if (isNameValid && isDestinationValid && isNumberOfTicketValid) {
      checkoutButton.removeAttribute("disabled");
    } else {
      checkoutButton.setAttribute("disabled", "true");
    }
  });
});

const submitButton = document.getElementById("submitButton");

document.getElementById("submitModal").addEventListener("click", function (event) {
  event.preventDefault();

  var form = document.getElementById("travelForm");

  form.submit();

  setTimeout(function () {
    location.reload();
  }, 10);
});
