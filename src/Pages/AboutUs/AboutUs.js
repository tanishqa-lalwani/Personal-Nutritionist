import React from "react";
import "./AboutUs.css";
import ellipse from '../../Images/Ellipse.png'
import mital from '../../Images/Mital.png'
import rushil from '../../Images/Rushil.png'
import akshar from '../../Images/Akshar.png'
import jigar from '../../Images/Jigar.png'
import kushagra from '../../Images/Kushagra.png'
import anany from '../../Images/Anany.png'
import rushi from '../../Images/Rushi.png'
import tanishqa from '../../Images/Tanishqa.png'
import akash from '../../Images/Aakash.png'
import marmik from '../../Images/Marmik.png'
import Footer from '../../Components/Footer/footer'

function AboutUs() {

  return (
    <div className="aboutus__screen " style={{ maxWidth: "100vw" }}>
        <div className="aboutus__head">
          <h1>About Us</h1>
        </div>

        <h1 className="container__head">Our aim</h1>
        <div className="container">
        
          <p className="content">Our platform offers credible information to help you make healthful eating choices. We are developing a goto website for people who are obsessing over fitness and count their calories and hesitate over mouth watering treats. Our aim is to make sure people know what they eat and how much they need for their day. This is a healthy place for people as they are surrounded by world class nutritionists giving them opinions and prescribing diet plans to work with their routine all packaged in one deal. 
            <br /><br />
            We aim to help users to find perfect recipes for themselves. Users can set goals and follow the best diet plans for overall health benefits. We use the best food databases across the internet to provide details about the number of nutrients, vitamins etc. of the food items.</p>
        <div className="img-cont">
          <img class="girl-img" src={ellipse} alt="" />
          </div>
          </div>

        <section className="team__research">
          <div className="section_container">
            <div className="section_header">
            <h1 className="container__head">Research and Documentation Team</h1>
            </div>

            <div className="wrapper">
              <div className="object">
                <div className="imgbox"><img src={mital} alt="" /></div>
                <div className="text">
                Mital Kamani<br />ID - 201801472
                </div>
              </div>

              <div className="object">
                <div className="imgbox"><img src={jigar} alt="" /></div>
                <div className="text">
                Jigar Marvaniya<br />ID - 201801430
                </div>
              </div>

              <div className="object">
                <div className="imgbox"><img src={akshar} alt="" /></div>
                <div className="text">
                Akshar Rughani<br />ID - 201801149
                </div>
              </div>

              <div className="object">
                <div className="imgbox"><img src={rushil} alt="" /></div>
                <div className="text">
                Rushil Bangia<br />ID - 201801072
                </div>
              </div>
              
              <div className="object">
                <div className="imgbox"><img src={marmik} alt="" /></div>
                <div className="text">
                Marmik Prajapati<br />ID - 201801431
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="team__front">
          <div className="section_container">
            <div className="section_header">
            <h1 className="container__head">Front-end Team</h1>
            </div>

            <div className="wrapper">
              <div className="object">
                <div className="imgbox"><img src={kushagra} alt="" /></div>
                <div className="text">
                Kushagra Pathak<br />ID - 201801005
                </div>
              </div>

              <div className="object">
                <div className="imgbox"><img src={tanishqa} alt="" /></div>
                <div className="text">
                Tanishqa Lalwani<br />ID - 201801139
                </div>
              </div>

              <div className="object">
                <div className="imgbox"><img src={akash} alt="" /></div>
                <div className="text">
                Aakash Dabhi<br />ID - 201801177
                </div>
              </div>

              <div className="object">
                <div className="imgbox"><img src={mital} alt="" /></div>
                <div className="text">
                Mital Kamani<br />ID - 201801472
                </div>
              </div>
              </div>

              <div className="wrapper">
              <div className="object">
                <div className="imgbox"><img src={anany} alt="" /></div>
                <div className="text">
                Anany Kashyap<br />ID - 201801420
                </div>
              </div>

              <div className="object">
                <div className="imgbox"><img src={rushil} alt="" /></div>
                <div className="text">
                Rushil Bangia<br />ID - 201801072
                </div>
              </div>
              </div>

          </div>
        </section>

        <section className="team__backend">
          <div className="section_container">
            <div className="section_header">
            <h1 className="container__head">Back-end Team</h1>
            </div>

            <div className="wrapper">
              <div className="object">
                <div className="imgbox"><img src={kushagra} alt="" /></div>
                <div className="text">
                Kushagra Pathak<br />ID - 201801005
                </div>
              </div>

              <div className="object">
                <div className="imgbox"><img src={tanishqa} alt="" /></div>
                <div className="text">
                Tanishqa Lalwani<br />ID - 201801139
                </div>
              </div>

              <div className="object">
                <div className="imgbox"><img src={rushi} alt="" /></div>
                <div className="text">
                Rushi Rajpara<br />ID - 201801410
                </div>
              </div>

              <div className="object">
                <div className="imgbox"><img src={akshar} alt="" /></div>
                <div className="text">
                Akshar Rughani<br />ID - 201801149
                </div>
              </div>
              
            </div>
          </div>
        </section>
    <Footer/>
</div>
);
}

export default AboutUs;