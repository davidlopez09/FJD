import "../assets/css/blogs.css";
import "../assets/css/metodologia.css";
import blogs from "../assets/images/blogs.png";
import analisis from "../assets/images/analisisrequerimiento.jpg";

export function Blogs() {
    return (
        <div id="blog" className="blogs">
            <div className="blogs-title">
                <div className="blog-noticias">
                    <h1 className="titublogs">Blogs y noticias sobre el desarrollo de software</h1>
                    <p className="subtiblogs">Entérate de las ultimas noticias sobre el desarrollo de software</p>
                </div>
                <div className="img-blogs">
                    <img className="img-blogs" src={blogs} alt="#" />
                </div>
            </div>
            <div className="card-blogs">
                <div className="card-cont">
                    <div className="card-meto">
                        <img src={analisis} alt="Imagen" className="card-image" />
                        <h2 className="card-title">hola</h2>
                        <p className="card-des">jsahhstcjduueionmsedbfgfa</p>
                        <a className="btn-blog">Saber mas</a>
                    </div>
                </div>
                <div className="card-cont">
                    <div className="card-meto">
                        <img src={analisis} alt="Imagen" className="card-image" />
                        <h2 className="card-title">hola</h2>
                        <p className="card-des">jsahhstcjduueionmsedbfgfa</p>
                        <a className="btn-blog">Saber mas</a>
                    </div>
                </div>
                <div className="card-cont">
                    <div className="card-meto">
                        <img src={analisis} alt="Imagen" className="card-image" />
                        <h2 className="card-title">hola</h2>
                        <p className="card-des">jsahhstcjduueionmsedbfgfa</p>
                        <a className="btn-blog">Saber mas</a>
                    </div>
                </div>
                <div className="card-cont">
                    <div className="card-meto">
                        <img src={analisis} alt="Imagen" className="card-image" />
                        <h2 className="card-title">hola</h2>
                        <p className="card-des">jsahhstcjduueionmsedbfgfa</p>
                        <a className="btn-blog">Saber mas</a>
                    </div>
                </div>
                <div className="card-cont">
                    <div className="card-meto">
                        <img src={analisis} alt="Imagen" className="card-image" />
                        <h2 className="card-title">hola</h2>
                        <p className="card-des">jsahhstcjduueionmsedbfgfa</p>
                        <a className="btn-blog">Saber mas</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Blogs;
