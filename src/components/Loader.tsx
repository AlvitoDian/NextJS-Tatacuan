export default function Loader({ screen = false }) {
  return (
    <div
      className={`flex items-center justify-center w-full ${
        screen ? "min-h-[80vh]" : ""
      }`}
    >
      <span className="loading loading-bars loading-lg text-[#16a34a]"></span>
    </div>
  );
}
