import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/index';
import Layout from '../../components/Layout/index';

import { variants } from '../../utils/motionConfig';
import { Title, Card, Container } from './styles';
import { useEffect, useState, useContext } from 'react';

import { Typography, Box, Modal } from "@mui/material"
import * as api from '../../services/api';
import { AuthContext } from '../../contexts/auth';

const Home = () => {
  const { user, setUser } = useContext(AuthContext)
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setOpen(!user?.user?.terms)
    }
  }, [user])

  return (
    <>
      <Layout title="Aulas" noMenu>
        <Container>
          <Card type="1" variants={variants.itemSlide} onClick={() => navigate('/tutorials')}>
            <Title>Aulas</Title>
          </Card>

          <Card type="2" variants={variants.itemSlide} onClick={() => navigate('/robot')}>
            <Title>Operações</Title>
          </Card>

          <Card type="3" variants={variants.itemSlide} onClick={() => navigate('/upgrades')}>
            <Title>Atualizações</Title>
          </Card>
        </Container>

        <Modal
          open={open}
          onClose={() => setOpen(true)}
        >
          <Box sx={{
            position: 'absolute',
            borderRadius: 3,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '87%',
            maxWidth: '500px',
            bgcolor: 'rgb(13, 14, 13)',
            boxShadow: 24,
            p: 2,
            outline: "0",
            border: "0"
          }}>
            <Typography variant="h6">
              Aceite os termos de uso
            </Typography>
            <div
              style={{
                marginTop: 14,
                width: "100%",
                height: 300,
                background: "rgba(255,255,255,0.1)",
                borderRadius: 10,
                padding: 7,
                overflowWrap: "break-word",
                overflowY: "scroll",
              }}
              className="text-white"
            >
              <p align="justify" style={{ lineHeight: "100%", marginBottom: "0in" }}>
                <font color="#000000">
                  <font face="Arial, serif">
                    <font size={3} style={{ fontSize: "12pt" }}>
                      <font size={4} style={{ fontSize: "14pt" }}>
                        <b>Prezados, sejam bem-vindos à plataforma da SpyTech</b>
                      </font>
                    </font>
                  </font>
                </font>
              </p>
              <p align="justify" style={{ lineHeight: "100%", marginBottom: "0in" }}>
                <br />
              </p>
              <p align="justify" style={{ lineHeight: "100%", marginBottom: "0in" }}>
                <font color="#000000">
                  <font face="Arial, serif">
                    <font size={3} style={{ fontSize: "12pt" }}>
                      <font size={3} style={{ fontSize: "11pt" }}>
                        É muito importante a leitura atenta destes Termos de Uso no ato de
                        seu cadastro na plataforma, pois ao se cadastrar, você estará
                        aceitando as cláusulas deste contrato. A MC Digital desenvolveu e
                        explora a plataforma SpyTech inserida em seu domínio{" "}
                      </font>
                      <font size={3} style={{ fontSize: "11pt" }}>
                        <i>(“www.appspytech.com”)</i>
                      </font>
                      <font size={3} style={{ fontSize: "11pt" }}>
                        , os quais são essenciais para a realização da prestação dos
                        serviços a que se dispõe. Lembrando que as estratégias automatizadas
                        são únicas e exclusivas, optamos por ter como nossa parceira de
                        negócios a maior e mais antiga corretora de opções do mundo, com
                        mais de 20 anos de mercado, a Binary e/ou Deriv garante a segurança
                        de seu investimento. É nela que o seu dinheiro ficará alocado e
                        seguro, ou seja, nós da MC Digital e Spytech não temos ligação
                        alguma com o seu capital investido e com os resultados atingidos.{" "}
                      </font>
                    </font>
                  </font>
                </font>
              </p>
              <p align="justify" style={{ lineHeight: "100%", marginBottom: "0in" }}>
                <font color="#000000">
                  <font face="Arial, serif">
                    <font size={3} style={{ fontSize: "12pt" }}>
                      <font size={3} style={{ fontSize: "11pt" }}>
                        Ao realizar a assinatura eletrônica destes termos em seu e-mail ou
                        SMS, você estará legalmente vinculado a todos os termos e condições
                        aqui presentes. Lembrando, que o presente{" "}
                      </font>
                      <font size={3} style={{ fontSize: "11pt" }}>
                        <i>Termos de Uso</i>
                      </font>
                      <font size={3} style={{ fontSize: "11pt" }}>
                        , estabelece a relação contratual entre o Licenciado e a
                        Licenciadora.{" "}
                      </font>
                    </font>
                  </font>
                </font>
              </p>
              <p align="justify" style={{ lineHeight: "100%", marginBottom: "0in" }}>
                <br />
              </p>
              <p align="justify" style={{ lineHeight: "100%", marginBottom: "0in" }}>
                <font color="#000000">
                  <font face="Arial, serif">
                    <font size={3} style={{ fontSize: "12pt" }}>
                      <font size={4} style={{ fontSize: "14pt" }}>
                        <b>Termos e Condições </b>
                      </font>
                    </font>
                  </font>
                </font>
              </p>
              <p align="justify" style={{ lineHeight: "100%", marginBottom: "0.47in" }}>
                <font color="#000000">
                  <font face="Arial, serif">
                    <font size={3} style={{ fontSize: "12pt" }}>
                      <font size={3} style={{ fontSize: "11pt" }}>
                        <b>1. Do Objeto </b>
                      </font>
                      <font size={3} style={{ fontSize: "11pt" }}>
                        1.1 A licenciadora outorga, neste ato, ao licenciado, pelo prazo
                        indeterminado, o direito de uso da Plataforma, onde contém
                        inicialmente 5 (cinco) estratégias operacionais, com acesso em
                        nuvem, sem a necessidade de instalação de software, acesso integrado
                        via mobile, acesso a uma conta de treinamento para praticar antes de
                        operar com dinheiro real, uma planilha completa para seu
                        gerenciamento operacional, suporte Individual via WhatsApp, e-mail e
                        comentários das aulas em horário comercial.{" "}
                      </font>
                    </font>
                  </font>
                </font>
              </p>
              <p align="justify" style={{ lineHeight: "100%", marginBottom: "0in" }}>
                <font color="#000000">
                  <font face="Arial, serif">
                    <font size={3} style={{ fontSize: "12pt" }}>
                      <font size={3} style={{ fontSize: "11pt" }}>
                        1.2 Ao final do período contratado, a renovação do plano é opcional,
                        caso o licenciado queira renovar, a recontratação se dará pelo mesmo
                        preço da primeira contratação.{" "}
                      </font>
                    </font>
                  </font>
                </font>
              </p>
              <p align="justify" style={{ lineHeight: "100%", marginBottom: "0.47in" }}>
                <br />
                <br />
              </p>
              <p align="justify" style={{ lineHeight: "100%", marginBottom: "0.47in" }}>
                <font color="#000000">
                  <font face="Arial, serif">
                    <font size={3} style={{ fontSize: "12pt" }}>
                      <font color="#000000">
                        <font size={3} style={{ fontSize: "11pt" }}>
                          1.3 A licença de uso é pessoal, intransferível. É vedado ao
                          licenciado comercializar, doar, arrendar, alienar, dar em garantia
                          ou, por qualquer outra forma, transferir a terceiros a Licença de
                          uso adquirida nos termos deste presente contrato.{" "}
                        </font>
                      </font>
                    </font>
                  </font>
                </font>
              </p>
              <p align="justify" style={{ lineHeight: "100%", marginBottom: "0.47in" }}>
                <font color="#000000">
                  <font face="Arial, serif">
                    <font size={3} style={{ fontSize: "12pt" }}>
                      <font color="#000000">
                        <font size={3} style={{ fontSize: "11pt" }}>
                          1.4 Em caso de substituição do licenciado, será obrigatória a
                          aquisição de nova licença de uso.{" "}
                        </font>
                      </font>
                    </font>
                  </font>
                </font>
              </p>
              <p align="justify" style={{ lineHeight: "100%", marginBottom: "0.47in" }}>
                <font color="#000000">
                  <font face="Arial, serif">
                    <font size={3} style={{ fontSize: "12pt" }}>
                      <font color="#000000">
                        <font size={3} style={{ fontSize: "11pt" }}>
                          1.5 A licenciadora prestará serviços de manutenção e suporte
                          técnico, além de esclarecimentos sobre o funcionamento das
                          estratégias.{" "}
                        </font>
                      </font>
                    </font>
                  </font>
                </font>
              </p>
              <p align="justify" style={{ lineHeight: "100%", marginBottom: "0.47in" }}>
                <font color="#000000">
                  <font face="Arial, serif">
                    <font size={3} style={{ fontSize: "12pt" }}>
                      <font color="#000000">
                        <font size={3} style={{ fontSize: "11pt" }}>
                          1.6 Sempre que notar alguma falha ou mensagem de erro nas
                          estratégias automatizadas, recomenda-se ao licenciado interromper
                          imediatamente o uso dos robôs e contatar o suporte técnico através
                          do e-mail:
                        </font>
                      </font>
                      <font size={3} style={{ fontSize: "11pt" }}>
                        suporte@appspytech.com
                      </font>
                      <font color="#000000">
                        <font size={3} style={{ fontSize: "11pt" }}>
                          ou whatsapp do suporte deixado na descrição das aulas no módulo de
                          suporte.
                        </font>
                      </font>
                    </font>
                  </font>
                </font>
              </p>
              <p align="justify" style={{ lineHeight: "100%", marginBottom: "0in" }}>
                <font color="#000000">
                  <font face="Arial, serif">
                    <font size={3} style={{ fontSize: "12pt" }}>
                      <font color="#000000">
                        <font size={3} style={{ fontSize: "11pt" }}>
                          1.7 O acesso à plataforma será disponibilizado em até dois dias
                          úteis após a confirmação do pagamento.{" "}
                        </font>
                      </font>
                    </font>
                  </font>
                </font>
              </p>
              <p align="justify" style={{ lineHeight: "100%", marginBottom: "0in" }}>
                <br />
              </p>
              <p align="justify" style={{ lineHeight: "100%", marginBottom: "0in" }}>
                <br />
              </p>
              <p align="justify" style={{ lineHeight: "100%", marginBottom: "0.47in" }}>
                <font color="#000000">
                  <font face="Arial, serif">
                    <font size={3} style={{ fontSize: "12pt" }}>
                      <font color="#000000">
                        <font size={3} style={{ fontSize: "11pt" }}>
                          <b>2. Riscos e Perdas </b>
                        </font>
                      </font>
                      <font color="#000000">
                        <font size={3} style={{ fontSize: "11pt" }}>
                          2.1 Investimentos em renda variável são atividades arriscadas,
                          dada a elevada volatilidade do mercado e possibilidade de perdas,
                          inclusive de todo o capital investido.{" "}
                        </font>
                      </font>
                    </font>
                  </font>
                </font>
              </p>
              <p align="justify" style={{ lineHeight: "100%", marginBottom: "0.47in" }}>
                <font color="#000000">
                  <font face="Arial, serif">
                    <font size={3} style={{ fontSize: "12pt" }}>
                      <font color="#000000">
                        <font size={3} style={{ fontSize: "11pt" }}>
                          2.2 Para diminuir estes riscos, a licenciadora disponibilizará
                          vídeos explicativos a respeito do gerenciamento de risco, controle
                          emocional e execução das estratégias. A execução das estratégias
                          através da nossa plataforma é voltada à usuários que estão cientes
                          dos riscos e das possibilidades de perdas envolvidas neste tipo de
                          atividade.{" "}
                        </font>
                      </font>
                    </font>
                  </font>
                </font>
              </p>
              <p align="justify" style={{ lineHeight: "100%", marginBottom: "0in" }}>
                <font color="#000000">
                  <font face="Arial, serif">
                    <font size={3} style={{ fontSize: "12pt" }}>
                      <font color="#000000">
                        <font size={3} style={{ fontSize: "11pt" }}>
                          2.3 Em hipótese alguma a MC Digital será responsável pelos
                          resultados das operações, danos indiretos ou perdas, sobre as
                          decisões ou operações que venham a ser realizadas.{" "}
                        </font>
                      </font>
                    </font>
                  </font>
                </font>
              </p>
              <p
                align="justify"
                style={{
                  lineHeight: "100%",
                  marginBottom: "0in",
                  pageBreakBefore: "always"
                }}
              >
                <br />
              </p>
              <p align="justify" style={{ lineHeight: "100%", marginBottom: "0.47in" }}>
                <font color="#000000">
                  <font face="Arial, serif">
                    <font size={3} style={{ fontSize: "12pt" }}>
                      <font color="#000000">
                        <font size={3} style={{ fontSize: "11pt" }}>
                          <b>3. Do Cadastro </b>
                        </font>
                      </font>
                      <font color="#000000">
                        <font size={3} style={{ fontSize: "11pt" }}>
                          3.1 O licenciado deve fazer um cadastro em nossa plataforma,
                          prestando informações exatas, precisas e verdadeiras. Após a
                          conclusão do cadastro e confirmação de pagamento, o licenciado
                          terá um login e uma senha, assumindo total responsabilidade por
                          sua guarda e sigilo. Caso o licenciado tome conhecimento ou
                          suspeite de qualquer utilização não autorizada no seu login,
                          deverá imediatamente alterar sua senha e informar a licenciadora.{" "}
                        </font>
                      </font>
                    </font>
                  </font>
                </font>
              </p>
              <p align="justify" style={{ lineHeight: "100%", marginBottom: "0.47in" }}>
                <font color="#000000">
                  <font face="Arial, serif">
                    <font size={3} style={{ fontSize: "12pt" }}>
                      <font color="#000000">
                        <font size={3} style={{ fontSize: "11pt" }}>
                          3.2 O licenciado, após efetivar seu login, deverá abrir uma conta
                          na corretora Binary e/ou Deriv para ter acesso as estratégias
                          disponibilizadas na área de membros da spytech. Vídeos
                          explicativos sobre como abrir conta na corretora, realizar
                          depósitos ou saques serão disponibilizados na própria plataforma
                          da spytech, onde o mesmo terá acesso assim que o pagamento for
                          aprovado. A licenciadora não terá acesso à conta monetária do
                          licenciado.{" "}
                        </font>
                      </font>
                    </font>
                  </font>
                </font>
              </p>
              <p align="justify" style={{ lineHeight: "100%", marginBottom: "0in" }}>
                <font color="#000000">
                  <font face="Arial, serif">
                    <font size={3} style={{ fontSize: "12pt" }}>
                      <font color="#000000">
                        <font size={3} style={{ fontSize: "11pt" }}>
                          3.3 Antes de dar início ao uso das estratégias, o licenciado
                          deverá assistir todos os vídeos de explicativos e conhecer
                          plenamente o funcionamento dos robôs e suas limitações, bem como
                          todos os riscos de perdas financeiras inerentes às transações no
                          mercado financeiro.{" "}
                        </font>
                      </font>
                    </font>
                  </font>
                </font>
              </p>
              <p align="justify" style={{ lineHeight: "100%", marginBottom: "0in" }}>
                <br />
              </p>
              <p align="justify" style={{ lineHeight: "100%", marginBottom: "0in" }}>
                <br />
              </p>
              <p align="justify" style={{ lineHeight: "100%", marginBottom: "0.47in" }}>
                <font color="#000000">
                  <font face="Arial, serif">
                    <font size={3} style={{ fontSize: "12pt" }}>
                      <font color="#000000">
                        <font size={3} style={{ fontSize: "11pt" }}>
                          <b>4. Do Pagamento </b>
                        </font>
                      </font>
                      <font color="#000000">
                        <font size={3} style={{ fontSize: "11pt" }}>
                          4.1 O Licenciado pagará antecipadamente a outorga da licença de
                          uso e a obtenção de acesso à plataforma no valor comercialmente
                          ajustado entre as partes.{" "}
                        </font>
                      </font>
                    </font>
                  </font>
                </font>
              </p>
              <p align="justify" style={{ lineHeight: "100%", marginBottom: "0in" }}>
                <font color="#000000">
                  <font face="Arial, serif">
                    <font size={3} style={{ fontSize: "12pt" }}>
                      <font color="#000000">
                        <font size={3} style={{ fontSize: "11pt" }}>
                          4.2 O referido pagamento será, mediante opção adotada pelo
                          licenciado, à vista via depósito bancário, PIX, ou parcelado em
                          até 12x no cartão de crédito através do Mercado Pago, Kiwify,
                          hotmart, PagSeguro, Perfect Pay, Ticto, Pepper ou PayPal.{" "}
                        </font>
                      </font>
                    </font>
                  </font>
                </font>
              </p>
              <p align="justify" style={{ lineHeight: "100%", marginBottom: "0in" }}>
                <br />
              </p>
              <p align="justify" style={{ lineHeight: "100%", marginBottom: "0in" }}>
                <br />
              </p>
              <p align="justify" style={{ lineHeight: "100%", marginBottom: "0in" }}>
                <font color="#000000">
                  <font face="Arial, serif">
                    <font size={3} style={{ fontSize: "12pt" }}>
                      <font color="#000000">
                        <font size={3} style={{ fontSize: "11pt" }}>
                          <b>5. Das Declarações e Garantias do Licenciado </b>
                        </font>
                      </font>
                      <font color="#000000">
                        <font size={3} style={{ fontSize: "11pt" }}>
                          5.1 Neste ato, o licenciado declara e garante à licenciadora, em
                          caráter irrevogável e irretratável, para todos os fins de direito,
                          que:{" "}
                        </font>
                      </font>
                    </font>
                  </font>
                </font>
              </p>
              <p align="justify" style={{ lineHeight: "100%", marginBottom: "0in" }}>
                <br />
              </p>
              <p align="justify" style={{ lineHeight: "100%", marginBottom: "0in" }}>
                <br />
              </p>
              <ul>
                <li>
                  <p align="justify" style={{ lineHeight: "100%", marginBottom: "0in" }}>
                    <font color="#000000">
                      <font face="Arial, serif">
                        <font size={3} style={{ fontSize: "12pt" }}>
                          <font color="#000000">
                            <font size={3} style={{ fontSize: "11pt" }}>
                              Está ciente e concorda que será o único responsável pela
                              definição da quantidade e valor financeiro a serem operados
                              pelos robôs;{" "}
                            </font>
                          </font>
                        </font>
                      </font>
                    </font>
                  </p>
                </li>
              </ul>
              <p
                align="justify"
                style={{
                  lineHeight: "100%",
                  marginBottom: "0in",
                  pageBreakBefore: "always"
                }}
              >
                <br />
              </p>
              <ul>
                <li>
                  <p align="justify" style={{ lineHeight: "100%", marginBottom: "0in" }}>
                    <font color="#000000">
                      <font face="Arial, serif">
                        <font size={3} style={{ fontSize: "12pt" }}>
                          <font color="#000000">
                            <font size={3} style={{ fontSize: "11pt" }}>
                              Está ciente e concorda que a definição de margens e limites de
                              operação é de responsabilidade exclusiva da corretora, não
                              tendo a licenciadora nenhuma participação ou responsabilidade
                              nesse processo;{" "}
                            </font>
                          </font>
                        </font>
                      </font>
                    </font>
                  </p>
                </li>
              </ul>
              <p align="justify" style={{ lineHeight: "100%", marginBottom: "0in" }}>
                <br />
              </p>
              <ul>
                <li>
                  <p align="justify" style={{ lineHeight: "100%", marginBottom: "0in" }}>
                    <font color="#000000">
                      <font face="Arial, serif">
                        <font size={3} style={{ fontSize: "12pt" }}>
                          <font color="#000000">
                            <font size={3} style={{ fontSize: "11pt" }}>
                              Está ciente e concorda que as estratégias automatizadas
                              executará ordens de forma automática em sua conta, com base
                              nas regras pré-estabelecidas.{" "}
                            </font>
                          </font>
                        </font>
                      </font>
                    </font>
                  </p>
                </li>
              </ul>
              <p align="justify" style={{ lineHeight: "100%", marginBottom: "0in" }}>
                <br />
              </p>
              <p align="justify" style={{ lineHeight: "100%", marginBottom: "0in" }}>
                <font color="#000000">
                  <font face="Arial, serif">
                    <font size={3} style={{ fontSize: "12pt" }}>
                      <font color="#000000">
                        <font size={3} style={{ fontSize: "11pt" }}>
                          Antes de qualquer operação em conta real e no caso de qualquer
                          dúvida sobre os limites apresentados, o licenciado buscará o
                          esclarecimento junto a licenciadora;{" "}
                        </font>
                      </font>
                    </font>
                  </font>
                </font>
              </p>
              <p align="justify" style={{ lineHeight: "100%", marginBottom: "0in" }}>
                <br />
              </p>
              <p align="justify" style={{ lineHeight: "100%", marginBottom: "0in" }}>
                <font color="#000000">
                  <font face="Arial, serif">
                    <font size={3} style={{ fontSize: "12pt" }}>
                      <font color="#000000">
                        <font size={3} style={{ fontSize: "11pt" }}>
                          Agora que você já leu todos os Termos de Uso, poderá indicar se
                          está de acordo realizando ou não o seu cadastro e tornando-se um
                          cliente.
                        </font>
                      </font>
                    </font>
                  </font>
                </font>
              </p>

            </div>
            <Button style={{ marginTop: 14, height: '54px', width: '100%', background: "linear-gradient(0.25turn, #6cdd60, #2196b6);", fontSize: 14, padding: 3 }} onClick={() => api.acceptTerms().then((data) => {
              if (data.success) {
                setOpen(false)
                api.getUser().then((data) => {
                  if (data.success) {
                    setUser(data.user)
                  }
                })
              }
            })}>
              Aceitar
            </Button>
          </Box>
        </Modal>
      </Layout>
    </>
  );
};

export default Home;
