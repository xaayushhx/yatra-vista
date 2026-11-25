export const CONTACT_INFO = {
  email: "infoyatravista@gmail.com",
  phoneRaw: "9307675008",
  phoneWithCountryCode: "919307675008",
  phoneDisplay: "+91 93076 75008",
  whatsappBaseUrl: "https://wa.me/919307675008",
} as const;

export function buildWhatsAppUrl(message: string): string {
  return `${CONTACT_INFO.whatsappBaseUrl}?text=${encodeURIComponent(message)}`;
}

export function buildMailtoUrl(subject: string, body: string): string {
  return `mailto:${CONTACT_INFO.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
