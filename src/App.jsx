import './App.css'
import { BsBodyText, BsEye, BsGlobe, BsImage, BsPencilSquare, BsThreeDots } from 'react-icons/bs'
import { Button, ButtonGradient, ButtonOutline } from './components/Button'
import { Card } from './components/Card'
import { InputForm, InputPrompt } from './components/Input'
import Tag from './components/Tag'
import NavBar from './components/NavBar'

function App() {
  return (
    <div>
      <div>
        <h1><u>NavBar</u></h1>
        <NavBar></NavBar>
      </div>
      <div>
        <h1><u>Buttons</u></h1>
        <ButtonGradient>
          Commencer
        </ButtonGradient>
        <ButtonOutline color={"purple"}>
          Connexion
        </ButtonOutline>
        <Button color='green'>
          S'inscrire
        </Button>
      </div>
      <br />
      <div>
        <h1><u>Tags</u></h1>
        <Tag color="default">Default</Tag>
        <Tag color="purple">Purple</Tag>
        <Tag color="green">Green</Tag>
        <Tag color="red">Red</Tag>
        <Tag color="blue">Blue</Tag>
        <Tag color="yellow">Yellow</Tag>
      </div>
      <br />
      <div>
        <h1><u>Inputs</u></h1>
        <InputPrompt placeholder={"Decrivez votre campagne..."} />
        <br />
        <InputForm placeholder={"Email"} />
        <InputForm password placeholder={"Mot de passe"} />
      </div>
      <br />
      <div>
        <h1><u>Cards</u></h1>
        <Card>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <h3 className="text-xl"><strong>Lancement Cours de Cuisine</strong></h3>
              <Tag color="green">Active</Tag>
            </div>
            <div className="flex items-center gap-1 text-gray-200">
              <ButtonOutline><BsEye /></ButtonOutline>
              <ButtonOutline><BsPencilSquare /></ButtonOutline>
              <ButtonOutline><BsThreeDots /></ButtonOutline>
            </div>
          </div>
          <p className="text-gray-500 mb-2">
            Promouvoir mon nouveau cours de cuisine en ligne pour débutants
          </p>
          <div className="flex items-center gap-10 text-gray-200">
            <div className="flex items-center gap-2">
              <div><BsImage /></div>
              <span>3 images</span>
            </div>
            <div className="flex items-center gap-2">
              <div><BsBodyText /></div>
              <span>6 publications</span>
            </div>
            <div className="flex items-center gap-2">
              <div><BsGlobe /></div>
              <span>landing page</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default App
