import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));

  // API route for Telegram Inquiry
  app.post("/api/inquiry", async (req, res) => {
    const { name, phone, cart, totalItems } = req.body;
    
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      console.warn("Telegram credentials missing in environment variables.");
      return res.status(200).json({ 
        success: false, 
        message: "تنظیمات تلگرام (Token/ChatID) در سرور یافت نشد. لطفا متغیرهای محیطی را تنظیم کنید." 
      });
    }

    // Format the message
    let message = `🆕 *استعلام قیمت جدید*\n\n`;
    message += `👤 نام: ${name}\n`;
    message += `📞 تماس: ${phone}\n`;
    message += `📦 تعداد اقلام: ${totalItems}\n\n`;
    message += `*لیست کالاها:*\n`;
    
    cart.forEach((item: any, index: number) => {
      message += `${index + 1}. ${item.name}: ${item.quantity} ${item.unit === 'branch' ? 'شاخه' : 'عدد'}\n`;
    });

    try {
      console.log(`Sending inquiry to Telegram for: ${name}`);
      const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
      const response = await fetch(telegramUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: "Markdown"
        })
      });

      const data = await response.json();
      
      if (!data.ok) {
        console.error("Telegram API response not OK:", data);
        return res.status(400).json({ 
          success: false, 
          message: `خطای تلگرام: ${data.description || "نامشخص"}` 
        });
      }

      console.log("Inquiry sent successfully to Telegram.");
      res.json({ success: true });
    } catch (error: any) {
      console.error("Error sending to Telegram:", error);
      res.status(500).json({ 
        success: false, 
        message: `خطا در ارتباط با تلگرام: ${error.message || "نامشخص"}` 
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
