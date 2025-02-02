import React, { useEffect, useState } from 'react';

function App() {
  const [faqs, setFaqs] = useState([]);
  const [language, setLanguage] = useState('en');
  const [showDialog, setShowDialog] = useState(false);
  const [newFAQ, setNewFAQ] = useState({ question: '', answer: '' });

  const fetchFAQs = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/faq?lang=${language}`);
      const data = await response.json();
      if (data && data.length > 0) {
        setFaqs(data);  
      } else {
        setFaqs([]);  
      }
    } catch (error) {
      console.error('Error fetching FAQs:', error);
      setFaqs([]); 
    }
  };

  useEffect(() => {
    fetchFAQs();
  }, [language]);

  const handleAddFAQ = async () => {
    if (!newFAQ.question || !newFAQ.answer) return alert("Fill all fields");
    try {
      const response = await fetch('http://localhost:5000/api/addfaq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newFAQ),
      });
      if (response.ok) {
        alert('FAQ added successfully!');
        setNewFAQ({ question: '', answer: '' });
        setShowDialog(false);
        fetchFAQs();  
      } else {
        alert('Error adding FAQ');
      }
    } catch (error) {
      console.error("Error adding FAQ:", error);
    }
  };

  return (
    <div>
      <h1 className='heading'>FAQs</h1>
      <label className='drpDown'>Select Language: </label>
      <select className='drpDown' value={language} onChange={(e) => setLanguage(e.target.value)}>
        <option value="en">English</option>
        <option value="hi">Hindi</option>
        <option value="bn">Bengali</option>
      </select>
      <button className='sh' onClick={() => setShowDialog(true)}>Add FAQ</button>
      <ul>
        {faqs.length > 0 ? (
          faqs.map((faq, index) => (
            <li className='li-tag' key={index}>
              <strong className='str'>{faq.question}</strong>
              <p>{faq.answer}</p>
            </li>
          ))
        ) : (
          <li>No FAQs available</li>
        )}
      </ul>
      {showDialog && (
        <div className="modal">
          <h2>Add New FAQ</h2>
          <input
            type="text"
            placeholder="Question"
            value={newFAQ.question}
            onChange={(e) => setNewFAQ({ ...newFAQ, question: e.target.value })}
          />
          <input
            type="text"
            placeholder="Answer"
            value={newFAQ.answer}
            onChange={(e) => setNewFAQ({ ...newFAQ, answer: e.target.value })}
          />
          <button className='submi' onClick={handleAddFAQ}>Submit</button>
          <button className='submi' onClick={() => setShowDialog(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
}

export default App;