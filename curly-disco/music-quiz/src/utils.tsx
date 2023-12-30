export const shuffleArray= (array: any[]) =>
   [...array].sort(()=> Math.random() - 0.5);

export function getCookie(name: string): string | null {
    let cookieValue: string | null = null;

    // Type assertion for document
    const doc: Document = document as Document;
    console.log('All cookies:', document.cookie);
    if (doc.cookie && doc.cookie !== '') {
        const cookies = doc.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === `${name}=`) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }

    return cookieValue;
}



// export function getCookie(name: string): string | null {
//    const doc: Document = document as Document;
//    console.log('All cookies:', document.cookie);
//    const value = `; ${document.cookie}`;
//    const parts = value.split(`; ${name}=`);
//    if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
//    return null;
//  }