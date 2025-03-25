import "./PrimaryNav.css";
import "./Layout.css";
import "./SecondaryNav.css";

/**
 * PrimaryNav är den övre komponenten i sidan.
 * Den visar titeln "Hoops" och en basketbild i toppmenyn.
 *
 * @returns {JSX.Element} En visuell toppmeny med sidans titel och bild
 */
export default function PrimaryNav() {
    return <>
   
   <div class="container"></div>
    <div id="topbar">
        <div><h1>Hoops</h1></div>
        <div ><img src="src/assets/basketball2.jpg" id="title-img" width="200px"
                height="150px" alt=""/></div>
        
        </div>
    
    </>;
}