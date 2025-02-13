// הגדרת משתנה הסיסמה
const correctPassword = "2025"; // סיסמה נכונה

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
    showDenyButton: true, // הוספת כפתור נוסף
    denyButtonText: "בקש סיסמה", // טקסט הכפתור
    inputAttributes: {
      autocapitalize: "off",
    },
    customClass: {
      actions: "my-actions", // כיתה מותאמת לאזור הכפתורים
      cancelButton: "order-2", // כפתור ביטול עם סדר והוספת רווח מימין
      confirmButton: "order-1 right-gap", // כפתור אישור
      denyButton: "order-3", // כפתור סרב
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
      sendWhatsAppMessageGuide(); // קריאה לשליחת הודעה לוואטסאפ אם המשתמש לוחץ על "בקש סיסמה"
    }
  });
}

function sendWhatsAppMessageGuide() {
  const phoneNumber = "+972529070000"; // מספר הטלפון שלך
  const message = "שלום , זו פניה מהאתר בנושא:";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, "_blank");
}

// הוספת CSS מותאם אישית לכפתורים
const style = document.createElement("style");
style.innerHTML = `
  .my-actions {
    display: flex;
    justify-content: space-between;  /* מיקום הכפתורים בצורה מאוזנת */
  }
  .order-1 {
    background-color: #4CAF50; /* צבע אדום לכפתור ביטול */
    color: white;
  }
  .order-2 {
    background-color: #f44336; /* צבע ירוק לכפתור אישור */
    color: white;
  }
  .order-3 {
    background-color: #9C27B0; /* צבע סגול לכפתור סרב */
    color: white;
  }
  .right-gap {
    margin-right: 10px; /* רווח בין כפתור הביטול לכפתור אישור */
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


