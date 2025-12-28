import { uploadLog } from "../services/api";

export default function FileUpload() {
  async function handleFile(e) {
    const file = e.target.files[0];
    if (!file) return;

    const res = await uploadLog(file);
    alert(res.status);
  }

  return (
    <label className="inline-flex items-center gap-2 text-sm cursor-pointer text-neutral-600 hover:text-neutral-900">
      <span className="px-3 py-1.5 rounded-md border border-neutral-300 bg-neutral-50 hover:bg-neutral-100 transition">
        Upload log file
      </span>
      <input type="file" className="hidden" onChange={handleFile} />
    </label>
  );
}
