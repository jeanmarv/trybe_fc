import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Team from '../database/models/team';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa o get do endpoint /match', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(Team, "findAll")
      .resolves([
      {
        id: 17,
        teamName: "Grêmio",
      },
      {
        id: 18,
        teamName: "Internacional",
      }
    ] as Team[]);
  });

  after(()=>{
    (Team.findAll as sinon.SinonStub).restore();
  })

  it('Testa se retorna corretamente os times passados', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .get('/teams');

    expect(chaiHttpResponse.status).to.equal(200);
    expect(chaiHttpResponse.body[0]).to.have.property('id');
    expect(chaiHttpResponse.body[0]).to.have.property('teamName');
    expect(chaiHttpResponse.body[0].id).to.equal(17);
    expect(chaiHttpResponse.body[0].teamName).to.equal('Grêmio');
    expect(chaiHttpResponse.body[1].id).to.equal(18);
    expect(chaiHttpResponse.body[1].teamName).to.equal('Internacional');
  });
});