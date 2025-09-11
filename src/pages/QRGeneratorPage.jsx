import { useState } from 'react';
import QRCodeComponent from '../components/QRCodeComponent';
import './QRGeneratorPage.css';

const QRGeneratorPage = () => {
  const [selectedTables, setSelectedTables] = useState([]);
  const [showAll, setShowAll] = useState(false);

  // Generuj čísla stolů (1-30)
  const allTables = Array.from({ length: 30 }, (_, i) => i + 1);

  const handleTableSelect = (tableNum) => {
    setSelectedTables(prev => 
      prev.includes(tableNum) 
        ? prev.filter(t => t !== tableNum)
        : [...prev, tableNum]
    );
  };

  const handleSelectAll = () => {
    setSelectedTables(showAll ? [] : allTables);
    setShowAll(!showAll);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="qr-generator-page">
      <div className="qr-generator-header no-print">
        <h1>QR kódy pro stoly</h1>
        <p>Klikněte na čísla stolů pro výběr. Každý stůl má svůj vlastní QR kód.</p>
        
        <div className="controls">
          <button onClick={handleSelectAll} className="select-all-btn">
            {showAll ? 'Zrušit výběr' : 'Vybrat vše'}
          </button>
          
          {selectedTables.length > 0 && (
            <>
              <span className="selection-info">
                Vybráno: {selectedTables.length} {selectedTables.length === 1 ? 'stůl' : 'stolů'}
              </span>
              <button onClick={handlePrint} className="print-btn">
                🖨️ Tisknout vybrané QR kódy
              </button>
            </>
          )}
        </div>

        <div className="table-selector">
          {allTables.map(tableNum => (
            <button
              key={tableNum}
              className={`table-select-btn ${selectedTables.includes(tableNum) ? 'selected' : ''}`}
              onClick={() => handleTableSelect(tableNum)}
            >
              {tableNum}
            </button>
          ))}
        </div>
      </div>

      <div className="qr-codes-container">
        {selectedTables.length === 0 && (
          <div className="no-selection no-print">
            <h3>👆 Vyberte stoly výše</h3>
            <p>Klikněte na čísla stolů pro které chcete vygenerovat QR kódy.</p>
            <p>Každý stůl bude mít svůj vlastní QR kód s automatickým přiřazením.</p>
          </div>
        )}

        {selectedTables.map(tableNum => (
          <div key={tableNum} className="qr-code-page">
            <QRCodeComponent 
              url="https://foodly-opalss.vercel.app/"
              tableNumber={tableNum}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default QRGeneratorPage;
