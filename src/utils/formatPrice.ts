export function formatPrice(price: number, language: 'en' | 'th'): string {
    if (language === 'th') {
        return '฿' + price.toLocaleString('en-US'); // Using en-US formatting for commas, but with Baht symbol
    }
    return '$' + price.toLocaleString('en-US');
}
