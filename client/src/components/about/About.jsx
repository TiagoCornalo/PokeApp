import Nav from '../Home/navigation/Nav'
// UNUSED ICONS FOR LATER INCORPORATION
/* import { IconContext } from 'react-icons' */
/* import { SiLinkedin, SiReact, SiRedux, SiCss3, SiNodedotjs, SiExpress, SiPostgresql, SiSequelize } from 'react-icons/si' */
import Classes from './about.module.css'
export default function About () {
  return (
    <div>
      <Nav />
      <div className={Classes.container}>
        <div className={Classes.main}>
        <h1>About me</h1>
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        <p>Hi there! I'm Tiago and this is my SPA.</p>
        <p>I made this proyect while studying at Henry´s bootcamp as my individual Proyect.</p>
        <p>It´s made from scratch by me, both Backend and Frontend.</p>
        <p>If you´re interested in my skills, we can get in touch via my LinkedIn bellow:</p>
        {/* <div className={Classes.linkedin}>
          <a
          rel="noreferrer"
          href='https://www.linkedin.com/in/tiago-cornalo/
          '
          target="_blank"
          >
            <IconContext.Provider value={{ className: `${Classes.icons}` }}>
            <SiLinkedin />
            </IconContext.Provider>
          </a>
        </div> */}
        <br />
        {/* <h4>
          Technologies used for this proyect:
        </h4>
        <div className={Classes.stack}>
          <div>
            <IconContext.Provider value={{ className: `${Classes.react}` }}>
              <SiReact />
            </IconContext.Provider>
          </div>
          <div>
            <IconContext.Provider value={{ className: `${Classes.redux}` }}>
              <SiRedux />
            </IconContext.Provider>
          </div>
          <div>
            <IconContext.Provider value={{ className: `${Classes.css}` }}>
              <SiCss3 />
            </IconContext.Provider>
          </div>
          <div>
            <IconContext.Provider value={{ className: `${Classes.node}` }}>
              <SiNodedotjs />
            </IconContext.Provider>
          </div>
          <div>
            <IconContext.Provider value={{ className: `${Classes.express}` }}>
              <SiExpress />
            </IconContext.Provider>
          </div>
          <div>
            <IconContext.Provider value={{ className: `${Classes.postgres}` }}>
              <SiPostgresql />
            </IconContext.Provider>
          </div>
          <div>
            <IconContext.Provider value={{ className: `${Classes.sequelize}` }}>
              <SiSequelize />
            </IconContext.Provider>
          </div>
        </div> */}
        </div>

      </div>

    </div>
  )
}
