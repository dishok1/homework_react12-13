import myPhoto from "../images/I_am.jpeg";
const About = () => {
  return (
    <div
      style={{
        padding: "30px",
        maxWidth: "700px",
        margin: "0 auto",
        lineHeight: "1.6",
      }}
    >
      <h2>Про застосунок</h2>
      <p>
        Цей застосунок створений для керування щоденними задачами: додавання,
        редагування, фільтрації та видалення.
      </p>

      <h3>Технології:</h3>
      <ul>
        <li>
          <strong>React</strong> (Functional Components, Hooks)
        </li>
        <li>
          <strong>React Router</strong> (Навігація)
        </li>
        <li>
          <strong>Fetch API</strong> (Взаємодія з сервером)
        </li>
        <li>
          <strong>JSON Server</strong> (Бекенд частина)
        </li>
      </ul>

      <div
        style={{
          marginTop: "30px",
          padding: "20px",
          background: "#f9f9f9",
          borderRadius: "8px",
        }}
      >
        <h3>Про автора</h3>
        <p>
          Привіт! Я розробник цього застосунку. Люблю чистий код та зручні
          інтерфейси.
        </p>
        <img
          src={myPhoto}
          alt="Автор"
          style={{
            borderRadius: "50%",
            marginTop: "10px",
            width: "150px",
            height: "150px",
            objectFit: "cover",
          }}
        />
      </div>
    </div>
  );
};

export default About;
