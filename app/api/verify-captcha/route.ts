import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { token } = await request.json();

    // On récupère la CLÉ SECRÈTE du fichier .env.local
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;

    if (!secretKey) {
      return NextResponse.json(
        { success: false, message: "Clé secrète manquante côté serveur." },
        { status: 500 }
      );
    }

    // On envoie la requête à Google pour vérification
    const response = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`,
      { method: "POST" }
    );

    const data = await response.json();

    if (data.success) {
      // C'est un humain !
      return NextResponse.json({ success: true });
    } else {
      // C'est un robot ou le token a expiré
      return NextResponse.json({ success: false, errors: data["error-codes"] }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json({ success: false, message: "Erreur serveur" }, { status: 500 });
  }
}