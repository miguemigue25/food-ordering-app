export default function InfoBox({ children }) {
    return (
        <div className="text-center bg-blue-200 p-4 rounded-lg border-2 border-blue-500">
            {children}
        </div>
    );
}