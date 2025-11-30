export default function DBDVerified() {
  return (
    <main className="w-full min-h-screen bg-gray-50 py-6">
      <div className="container mx-auto max-w-4xl px-4">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Company Registration Certificate (DBD Verified)
        </h1>

        <div className="w-full rounded-lg overflow-hidden shadow">
          <iframe
            src="/licenese/หนังสือรับรองบริษัท-ctg.pdf"
            className="w-full h-[85vh] md:h-[90vh]"
            title="DBD Company Registration Certificate"
          />
        </div>

        <p className="text-center text-sm text-gray-600 mt-4">
          If the document does not display,{" "}
          <a
            href="/licenese/หนังสือรับรองบริษัท-ctg.pdf"
            className="text-blue-600 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            click here to download the PDF
          </a>
          .
        </p>
      </div>
    </main>
  );
}
