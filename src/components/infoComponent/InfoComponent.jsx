import { useState } from "react";
import "./InfoComponent.css";
import QuestionComponent from "../questionComponent/QuestionComponent";

function InfoComponent() {
  const [start, setStart] = useState();
  const handleStartTest = () => {
    setStart(true);
  };

  if (start) {
    return  <QuestionComponent />;
  }
  return (
    <div>
      <div className="row info ">
        <div className="col-6">
          <h3>Teste Hoş Geldiniz!</h3>
          <p>
            Bu test, 10 sorudan oluşmaktadır. Her soru için 30 saniye süreniz
            olacak. Soruların ilk 4 saniyesinde cevap seçenekleri
            görüntülenmeyecek, bu sürenin sonunda seçenekler belirecektir.
          </p>
          <h6>Önemli Notlar:</h6>
          <ul className="notes">
            <li>
              Cevap şıklarından birini seçtikten sonra veya süre dolduğunda
              otomatik olarak bir sonraki soruya geçileceksiniz.
            </li>
            <li>
              Geçmiş sorulara geri dönme şansınız olmayacak, bu yüzden
              cevaplarınızı dikkatlice seçin.
            </li>
            <li>
              Testin sonunda, her soruya verdiğiniz yanıtlar ve doğru/yanlış
              sayılarınız sizinle paylaşılacak.
            </li>
          </ul>

          <div className="btn">
            <button className="btn-start" onClick={handleStartTest}>
              Teste Başla
            </button>
            <p>Learn More</p>
          </div>
        </div>
        <div className="col-6">
          <img src="./pictures/info.png" width={400} height={400} />
        </div>
      </div>
    </div>
  );
}

export default InfoComponent;
