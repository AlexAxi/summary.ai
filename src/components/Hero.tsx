
import  logo  from "../assets/ai-logo.png";


const Hero = () => {
  return (
    <header className="">
      <nav style={{display:"flex", justifyContent: "center"}}>
        <img src={logo} alt="SummaryAI" style={{width:"50px"}} />
      </nav>

      <h1 className="head_text">
        Summarize Articles <br />
        With AI
      </h1>
    </header>
  );
};

export default Hero;
