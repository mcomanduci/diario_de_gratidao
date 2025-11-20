import { Resend } from "resend";
import { EmailTemplate } from "@/components/email-template";

const resend = new Resend(process.env.RESEND_API_KEY);

// export async function POST() {
//   try {
//     const { data, error } = await resend.emails.send({
//       from: "Diário de Gratidão <mcomanduci@gmail.com>",
//       to: ["mcomanduci@gmail.com"],
//       subject: "Hello world",
//       react: EmailTemplate({ firstName: "Marcelo" }),
//     });

//     if (error) {
//       return Response.json({ error }, { status: 500 });
//     }

//     return Response.json(data);
//   } catch (error) {
//     return Response.json({ error }, { status: 500 });
//   }
// }

export async function GET() {
  try {
    const { data, error } = await resend.emails.send({
      from: "Diário de Gratidão <onboarding@resend.dev>",
      to: ["mcomanduci@gmail.com"],
      subject: "Hello world",
      html: `<html><body><h1>Hello, Marcelo!</h1><p>This is a test email sent using Resend.</p></body></html>`,
    });
    if (error) {
      return Response.json({ error }, { status: 500 });
    }
    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
