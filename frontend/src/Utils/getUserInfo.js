export default function getUserInfo() {
    try {
        const saved = localStorage.getItem("userInfo");
        if (!saved) return null;

        const parsed = JSON.parse(saved);
        return parsed;
    } catch (err) {
        console.error("Failed to parse userInfo from localStorage:", err);
        return null;
    }
}