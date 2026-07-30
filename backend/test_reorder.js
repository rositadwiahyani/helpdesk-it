async function test() {
  try {
    const res = await fetch('http://localhost:5000/api/admin/categories/reorder', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ updates: [{ id: 1, sort_order: 1 }] })
    });
    const text = await res.text();
    console.log(res.status, text);
  } catch (err) {
    console.error(err);
  }
}
test();
