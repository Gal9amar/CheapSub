const correctPassword = "3030"; // סיסמה נכונה

function promptPassword(contentId, url, event) {
  event.preventDefault(); // מניעת ניווט ברירת מחדל

  Swal.fire({
    title: "הזן סיסמה",
    text: 'כדי לצפות במדריך החינמי יש לבקש סיסמה ע"י שליחת הודעה.',
    input: "password",
    inputPlaceholder: "הכנס את הסיסמה כאן",
    showCancelButton: true,
    confirmButtonText: "אישור",
    cancelButtonText: "ביטול",
    showDenyButton: true, // כפתור נוסף
    denyButtonText: "בקש סיסמה",
    inputAttributes: {
      autocapitalize: "off",
    },
    customClass: {
      actions: "my-actions",
      cancelButton: "order-2",
      confirmButton: "order-1 right-gap",
      denyButton: "order-3",
    },
    preConfirm: (password) => {
      if (password === correctPassword) {
        Swal.close(); // סוגר את המודאל לפני הטעינה
        loadContent(contentId, url); // טוען את התוכן לדיב המתאים
      } else {
        Swal.showValidationMessage("סיסמה שגויה, נסה שוב.");
      }
    },
  }).then((result) => {
    if (result.isDenied) {
      sendWhatsAppMessageGuide();
    }
  });
}

// פונקציה לטעינת התוכן
function loadContent(contentId, url) {
  const contentArea = document.getElementById(contentId);

  // הצגת הודעת טעינה
  contentArea.innerHTML = "<p>טוען תוכן...</p>";

  // טעינת התוכן מהקובץ החיצוני
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("שגיאה בטעינת התוכן");
      }
      return response.text();
    })
    .then((data) => {
      contentArea.innerHTML = `
        <button class="close-button" onclick="closeContent('${contentId}')">סגירה</button>
        ${data}
      `;

      // ✅ הוספת גלילה אוטומטית לאחר טעינת התוכן
      setTimeout(() => {
        contentArea.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 200); // עיכוב קל כדי לאפשר לתוכן להיטען
    })
    .catch((error) => {
      contentArea.innerHTML = `<p>שגיאה בטעינה: ${error.message}</p>`;
    });
}

// פונקציה לשליחת הודעה לוואטסאפ
function sendWhatsAppMessageGuide() {
  const phoneNumber = "+972529070000";
  const message = "שלום , זו פניה מהאתר בנושא:";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, "_blank");
}

// פונקציה לסגירת התוכן
function closeContent(contentId) {
  document.getElementById(contentId).innerHTML = "";
}

// הוספת CSS מותאם אישית לכפתורים
const style = document.createElement("style");
style.innerHTML = `
  .my-actions {
    display: flex;
    justify-content: space-between;
  }
  .order-1 {
    background-color:  #4CAF50; /* ירוק */
    color: white;
  }
  .order-2 {
    background-color: #f44336; /* אדום */
    color: white;
  }
  .order-3 {
    background-color: #2196F3; /* כחול */
    color: white;
  }
  .right-gap {
    margin-right: 10px;
  }
`;
document.head.appendChild(style);

function sendWhatsAppMessageGuide() {
  const phoneNumber = "+972529070000"; // מספר הטלפון שלך
  const message = "שלום, אני צריך סיסמה למדריך באתר.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, "_blank"); // פותח את וואטסאפ בחלון חדש
}

function sendWhatsAppMessageBuy(productName, productPrice, productDescription) {
  const phoneNumber = "+972529070000"; // מספר הטלפון שלך
  const message = `שלום, אני מתעניין במוצר מהאתר שלך:
  
  שם המוצר: ${productName}
  מחיר: ${productPrice}
  `;
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, "_blank");
  closePasswordPopup();
}
