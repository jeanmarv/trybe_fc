import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/user';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa se a função findOne e posts corretos e incorretos', () => {

  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(User, "findOne")
      .resolves({
        id: 1,
        username: "Admin",
        role: "admin",
        email: "admin@admin.com",
        password: "$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW"
        } as User);
  });

  after(()=>{
    (User.findOne as sinon.SinonStub).restore();
  })

  it('Testa se loga com status correto quando passado tudo correto', async () => { 
    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send({
         email:'admin@admin.com',
         password:'secret_admin'
       });
    expect(chaiHttpResponse.status).to.be.equal(200)
  });

  it('Testa se da o status de erro ao tentar logar com a senha incorreta', async () => { 
    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send({
         email:'admin@admin.com',
         password:'senhaincorretaXD'
       });
    expect(chaiHttpResponse.status).to.be.equal(401)
  });
});