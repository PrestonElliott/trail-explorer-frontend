import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, ListGroup, Image } from "react-bootstrap"
import ReactLoading from 'react-loading'
import Iframe from 'react-iframe'
import diff from '../images/difficulty/difficulty-export'

class Trails extends Component {

    state = { 
        redirect: null
    }

    loading = () => {
        if(!this.props.allTrails.length) {
            return (
                <div className="loading">
                    <ReactLoading className='react-loading' type="cylon" color="#026F3D" width="30%" />
                </div>
            )
        }
    }

    renderTrails = () => {
        if(this.props.allTrails.length) {
          const trailCards = this.props.allTrails.map(t => {
            return(
                <Card id="trail-card" key={t.id}>
                    <Card.Img 
                        
                        id="trail-card-image" 
                        alt="trail-img" 
                        className="card-img" 
                        src={t.imgSmallMed ? 
                        ( t.imgSmallMed) 
                            : 
                        ("https://pdxfamilyadventures.com/wp-content/uploads/2012/11/DSC03794.jpg")} 
                    /><br/>
                    
                    <Card.Title id="trail-name">{t.name}</Card.Title>

                    <Card.Body>
                        <Card.Text>{t.location} </Card.Text>
                        <Card.Text id="trail-summary">{t.summary} </Card.Text>
                        <ListGroup variant="flush">
                            <ListGroup.Item>Stars: {t.stars}</ListGroup.Item>
                            <ListGroup.Item>Length: {t.length} miles</ListGroup.Item>
                            <ListGroup.Item>High: {t.high} ft, Low: {t.low} ft</ListGroup.Item>

                            <ListGroup.Item id="trail-difficulty">
                                Difficulty: <Image src={diff[t.difficulty].src} alt={diff[t.difficulty].alt}/>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <a href={t.url} rel="noopener noreferrer" target="_blank">Details</a>
                            </ListGroup.Item>

                            {/* <ListGroup.Item>Ascent: {t.ascent} ft Descent: {t.descent} ft</ListGroup.Item> */}
                            {/* <ListGroup.Item id="trail-conditions">Conditions: {t.conditionStatus}, {t.conditionDetails}</ListGroup.Item> */}
                        </ListGroup>
                  </Card.Body>
              </Card>
            )
        })
          return(
            <div className = "row">
              {trailCards}
            </div>
          )
        }
    }   

    render() {
        return (
            <div>
                <br/><h2> Find a trail near you! </h2><br/>
                <Iframe title="trails-map" className="trails-map" frameborder="0" scrolling="yes"
                    src={`https://www.hikingproject.com/widget/map?v=3&favs=1&searchBar=0&location=fixed&x=-11720100&y=4865450&z=11&h=450`}>
                </Iframe>
                { this.loading() }
                { this.renderTrails() }
            </div>
        )
    }
}

const mapStateToProps = state => ({
    allTrails: state.location.allTrails,
    lat: state.location.lat.replace('!',''),
    lon: state.location.lon.replace('!',''),
    geoError: state.location.geoError
})
export default connect(mapStateToProps)(Trails)
