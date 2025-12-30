export default function WipBanner() {
  return (
    <div className="mb-8 glass-card border-yellow-500/50 bg-yellow-500/10 p-6">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 text-3xl">🚧</div>
        <div>
          <h3 className="text-xl font-bold text-yellow-400 mb-2">
            Work In Progress
          </h3>
          <p className="text-gray-300 leading-relaxed">
            This section is currently under construction. Content is being developed and will be updated soon.
          </p>
        </div>
      </div>
    </div>
  );
}
