// הגדרת משתנה הסיסמה בתחילת הקובץ
const correctPassword = "9070000"; // סיסמה נכונה

// פונקציה לבדיקת סיסמה
function promptPassword(contentId, url) {
  const password = prompt('כדי לצפות במדריך החינמי יש לבקש סיסמה ע"י שליחת הודעה\nלחץ על הלחצן הירוק בראש העמוד שלח הודעה');

  if (password === null) {
    // אם המשתמש לחץ על ביטול, אל תעשה כלום
    return;
  }

  if (password === correctPassword) {
    loadContent(contentId, url);
  } else {
    alert("סיסמה לא נכונה, נסה שוב.");
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
                <button class="close-button" onclick="closeContent('${contentId}')">×</button>
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
