import "../assets/css/blogs.css";
import "../assets/css/metodologia.css";
import blogs from "../components/Svg/Blog.svg"
import ComoDesarrollan from "./Svg/ComoDesarrollan.svg";
import QueNecesito from "./Svg/QueNecesito.svg";
import ComoFunciona from "./Svg/ComoFunciona.svg";
import ConsejosVitales from "./Svg/ConsejosVitales.svg";

export function Blogs() {
    return (
        <div id="blog" className="blogs">
            <div className="blogs-title">
                <div className="blog-noticias">
                    <h1 className="titublogs">Blogs y noticias sobre el desarrollo de software</h1>
                    <p className="subtiblogs">Entérate de las últimas noticias sobre el desarrollo de software</p>
                </div>
                <img className="img-blogs" src={blogs} alt="#" />
            </div>
            <div className="card-blogs">
                <div className="card-cont">
                    <div className="card-meto">
                        <img src={ComoDesarrollan} alt="Imagen" className="card-image" />
                        <h2 className="card-title">¿Cómo se desarrollan las aplicaciones en Colombia?</h2>
                        <a
                            href="https://www.comunicare.es/desarrollo-de-apps-colombia/"
                            className="btn-blog"
                            target="_blank">
                            Saber más
                        </a>
                    </div>
                </div>
                <div className="card-cont">
                    <div className="card-meto">
                        <img src={QueNecesito} alt="Imagen" className="card-image" />
                        <h2 className="card-title">¿Qué necesito para desarrollar aplicaciones móviles en Colombia?</h2>
                        <a
                            href="https://es.goodbarber.com/blog/como-crear-app-android-ios-tutorial/"
                            className="btn-blog"
                            target="_blank">
                            Saber más
                        </a>
                    </div>
                </div>
                <div className="card-cont">
                    <div className="card-meto">
                        <img src={ComoFunciona} alt="Imagen" className="card-image" />
                        <h2 className="card-title">¿Qué es y como funciona el desarrollo de aplicaciones móviles?</h2>
                        <a
                            href="https://www.ibm.com/mx-es/topics/mobile-application-development"
                            className="btn-blog"
                            target="_blank">
                            Saber más
                        </a>
                    </div>
                </div>
                <div className="card-cont">
                    <div className="card-meto">
                        <img src={ConsejosVitales} alt="Imagen" className="card-image" />
                        <h2 className="card-title">9 consejos vitales para el desarrollo de software a medida</h2>
                        <a
                            href="https://distillery.com/es/blog/desarrollo-de-software-a-medida-beneficios-9-consejos-para-el-exito/"
                            className="btn-blog"
                            target="_blank">
                            Saber más
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Blogs;
