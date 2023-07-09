import { Grid } from '@arco-design/web-react';
import { Link } from 'react-router-dom';

const Row = Grid.Row;
const Col = Grid.Col;

export const NotFound = () => <Row align='center' style={{height: '100vh'}}><Col span={6}></Col><Col span={12}><h1 style={{textAlign: 'center'}}>404</h1><h2 style={{textAlign: 'center'}}>Nothing to see here!</h2><h3 style={{textAlign: 'center'}} ><Link to='/authentication'>Go back</Link></h3></Col><Col span={6}></Col></Row>