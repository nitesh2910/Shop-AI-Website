export const getImageSrc = (image) => {
    if (!image) return 'https://via.placeholder.com/300';
    if (image.startsWith('http')) return image;

    // Get base URL from environment variable, ensuring no trailing slash and no /api suffix
    const rawBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:9090';
    const baseUrl = rawBaseUrl.replace(/\/api\/?$/, '').replace(/\/+$/, '');

    // Ensure image path starts with a slash
    const imagePath = image.startsWith('/') ? image : `/${image}`;

    return `${baseUrl}${imagePath}`;
};
