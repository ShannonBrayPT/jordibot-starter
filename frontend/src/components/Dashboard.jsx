<section className="bg-gray-800 p-4 rounded-lg overflow-x-auto">
  <h2 className="text-lg font-bold mb-2">📨 Subscriber Messages</h2>
  <table className="w-full text-sm text-left text-white">
    <thead className="text-xs text-gray-300 uppercase bg-gray-700">
      <tr>
        <th className="px-4 py-2">User</th>
        <th className="px-4 py-2">Time</th>
        <th className="px-4 py-2">Message</th>
        <th className="px-4 py-2">Action</th>
      </tr>
    </thead>
    <tbody>
      {messages.map((msg, idx) => (
        <tr key={idx} className="border-b border-gray-600">
          <td className="px-4 py-2">{msg.username}</td>
          <td className="px-4 py-2">{new Date(msg.timestamp).toLocaleString()}</td>
          <td className="px-4 py-2">{msg.content}</td>
          <td className="px-4 py-2"><button className="text-pink-400 hover:underline">Reply</button></td>
        </tr>
      ))}
    </tbody>
  </table>
</section>
