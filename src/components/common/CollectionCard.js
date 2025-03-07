import { useContext, useState } from 'react';
import { Card, Image, ListGroup, ListGroupItem } from '../bootstrap-osu-collector'
import moment from 'moment'
import './CollectionCard.css'
import { LinkContainer } from 'react-router-bootstrap'
import Truncate from 'react-truncate'
import { starToColor } from '../../utils/misc'
import BarGraph from './BarGraph';
import styled, { ThemeContext } from 'styled-components'
import ModeCounters from './ModeCounters';

const GraphContainer = styled(Card.Body)`
    cursor: pointer;
    background-color: ${props => props.theme.darkMode ? '#121212' : '#eee'};
`

function CollectionCard({ collection }) {

    const theme = useContext(ThemeContext)

    const [hovered, setHovered] = useState(false)

    const relativeDate = moment.unix(collection.dateUploaded._seconds).fromNow()
    const heartColour = collection.favouritedByUser ? 'red' : 'grey'
    const difficultySpread = collection.difficultySpread
        ? collection.difficultySpread
        : {
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
            6: 0,
            7: 0,
            8: 0,
            9: 0,
            10: 0
        }

    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <Card $lightbg className={`mx-3 ${hovered ? 'shadow' : 'shadow-sm'}`}>
                <LinkContainer to={`/collections/${collection.id}`}>

                    {/* Difficulty Spread Graph */}
                    <GraphContainer className='px-0 pt-0 pb-1' variant='top'>
                        <BarGraph
                            data={[
                                ['', '', { role: 'style' }],
                                ...[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(star =>
                                    [star.toString(), difficultySpread[star], starToColor(star, theme.darkMode)]
                                )
                            ]}
                            height={80}
                        />
                    </GraphContainer>

                </LinkContainer>
                <LinkContainer to={`/collections/${collection.id}`}>
                    <Card.Body className='collection-card-clickable pt-3'>
                        <div className='d-flex justify-content-between align-items-top'>
                            <div style={{ width: '100%' }}>
                                <ModeCounters
                                    collection={collection}
                                    className='mb-3'
                                />
                                <Card.Title>
                                    <Truncate lines={1}>
                                        {collection.name}
                                    </Truncate>
                                </Card.Title>
                            </div>
                            <Card.Title>
                                <div className='pt-0 d-flex align-items-center'>
                                    <i className='fas fa-heart mr-2' style={{ color: heartColour }}></i>
                                    <small> {collection.favourites} </small>
                                </div>
                            </Card.Title>
                        </div>
                        <Card.Text>
                            {collection.description ?
                                <Truncate lines={1}>
                                    {collection.description}
                                </Truncate>
                                :
                                <small className='text-muted'>
                                    <i>no description</i>
                                </small>
                            }
                        </Card.Text>
                    </Card.Body>
                </LinkContainer>
                <ListGroup className='list-group-flush'>
                    <ListGroupItem $lightbg>
                        <div className='d-flex justify-content-between align-items-center'>
                            <div className='d-flex justify-content-start align-items-center my-1'>
                                <Image className='collection-card-uploader-avatar mr-2' src={`https://a.ppy.sh/${collection.uploader.id}`} roundedCircle />
                                <LinkContainer to={`/users/${collection.uploader.id}/uploads`}>
                                    <a> {collection.uploader.username} </a>
                                </LinkContainer>
                                {collection.uploader.rank > 0 &&
                                    <small className='text-muted ml-1'>
                                        #{collection.uploader.rank}
                                    </small>
                                }
                            </div>
                            <small className='text-muted'>{relativeDate}</small>
                        </div>
                    </ListGroupItem>
                </ListGroup>
            </Card>
        </div>
    )
}

export default CollectionCard
