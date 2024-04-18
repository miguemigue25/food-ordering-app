export default function SuccessBox({ children }) {
    return (
        <div className="text-center bg-green-200 p-4 rounded-lg border-2 border-green-500">
            {children}
        </div>
    );
}