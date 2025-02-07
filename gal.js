// הגדרת משתנה הסיסמה בתחילת הקובץ
const correctPassword = "2025"; // סיסמה נכונה

// פונקציה לבדיקת סיסמה
function promptPassword(contentId, url) {
  const password = prompt('כדי לצפות במדריך החינמי יש לבקש סיסמה ע"י שליחת הודעה\nלחץ על הלחצן הירוק בראש העמוד שלח הודעה');

  if (password === null) {
    // אם המשתמש לחץ על ביטול, מנוע את ברירת המחדל של הלינק
    event.preventDefault();
    return;
  }

  if (password === correctPassword) {
    loadContent(contentId, url);
  } else {
    alert("סיסמה לא נכונה, נסה שוב.");
    event.preventDefault(); // מניעת הגלילה במקרה של סיסמה שגויה
  }
}

// פונקציה לטעינת התוכן
function loadContent(contentId, url) {
  const contentArea = document.getElementById(contentId);
  const buttons = document.querySelectorAll("nav button");

  // הסתרת כפתורי הפתיחה
  buttons.forEach((button) => (button.style.display = "none"));

  // נקה את התוכן הנוכחי והראה הודעת טעינה
  contentArea.innerHTML = "<p>טוען תוכן...</p>";

  // טען את התוכן מהעמוד החיצוני
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("שגיאה בטעינת התוכן");
      }
      return response.text();
    })
    .then((data) => {
      // שיבוץ כפתור סגירה והתוכן שהובא
      contentArea.innerHTML = `
                <button class="close-button" onclick="closeContent('${contentId}')">סגירה</button>
                ${data}
            `;
    })
    .catch((error) => {
      contentArea.innerHTML = `<p>שגיאה בטעינה: ${error.message}</p>`;
    });
}

// פונקציה לסגור את התוכן
function closeContent(contentId) {
  const contentArea = document.getElementById(contentId);
  const buttons = document.querySelectorAll("nav button");

  // ניקוי התוכן
  contentArea.innerHTML = "";

  // הצגת כפתורי הפתיחה מחדש
  buttons.forEach((button) => (button.style.display = "inline-block"));
}
function sendWhatsAppMessageGuide() {
  const phoneNumber = "+972529070000"; // מספר הטלפון שלך
  const message = "שלום, אני רוצה לקבל את הסיסמה לצפייה במדריך.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, "_blank");
  closePasswordPopup();
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


