import React from 'react'
import { useNavigate,useLocation} from 'react-router-dom';

const Cvg = () => {
    
  return (
    <div className="w-screen flex justify-start items-center space-y-4 flex-col">
        <div>CONDITIONS GENERALES DE VENTE</div>
        <div>En vigueur au 05/11/2023</div>
        <div className=" w-screen flex justify-start items-start space-y-4 flex-col px-6">
            <div>ARTICLE 1 - CHAMP D'APPLICATION</div>
            <div>Les présentes Conditions Générales de Vente (dites « CGV ») s'appliquent, sans restriction ni
                réserve à l'ensemble des ventes conclues par le Vendeur auprès d'acheteurs non professionnels («
                Les Clients ou le Client »), désirant acquérir les produits proposés à la vente (« Les Produits ») par le
                Vendeur sur le site imbehindmyhead.com. Les Produits proposés à la vente sur le site sont les
                suivants : <br/><br/>
                Vêtements, accessoires, chaussures, bijoux.
                <br/><br/>
                Les caractéristiques principales des Produits et notamment les spécifications, illustrations et
                indications de dimensions ou de capacité des Produits, sont présentées sur le site
                imbehindmyhead.com ce dont le client est tenu de prendre connaissance avant de commander.
                Le choix et l'achat d'un Produit sont de la seule responsabilité du Client.
                Les offres de Produits s'entendent dans la limite des stocks disponibles, tels que précisés lors de la
                passation de la commande.<br/><br/>
                Ces CGV sont accessibles à tout moment sur le site imbehindmyhead.com et prévaudront sur toute
                autre document.
                Le Client déclare avoir pris connaissance des présentes CGV et les avoir acceptées en cochant la
                case prévue à cet effet avant la mise en œuvre de la procédure de commande en ligne du site
                imbehindmyhead.com.<br/>
                Sauf preuve contraire, les données enregistrées dans le système informatique du Vendeur constituent
                la preuve de l'ensemble des transactions conclues avec le Client.
                Les coordonnées du Vendeur sont les suivantes :<br/><br/>
                Tony Launay<br/>
                21 rue Chevée Cergy<br/>
                Numéro d'immatriculation : 899836167<br/>
                Email : imbehindmyhead@gmail.com<br/>
                Téléphone : 0646752685<br/><br/>
                Les Produits présentés sur le site imbehindmyhead.com sont proposés à la vente pour les territoires
                suivants :<br/>
                France Métropolitaine et tout autres pays en dehors de la France Métropolitaine.<br/><br/>
                En cas de commande vers un pays autre que la France métropolitaine, le Client est l'importateur du
                ou des Produits concernés.
                Pour tous les Produits expédiés hors Union européenne et DOM-TOM, le prix sera calculé hors taxes
                automatiquement sur la facture.
                Des droits de douane ou autres taxes locales ou droits d'importation ou taxes d'état sont susceptibles
                d'être exigibles. Ils seront à la charge et relèvent de la seule responsabilité du Client.
            </div>
            <div><br/>ARTICLE 2 - PRIX<br/></div>
            <div>Les Produits sont fournis aux tarifs en vigueur figurant sur le site imbehindmyhead.com, lors de
                l'enregistrement de la commande par le Vendeur.<br/>
                Les prix sont exprimés en Euros, HT et TTC.<br/>
                Les tarifs tiennent compte d'éventuelles réductions qui seraient consenties par le Vendeur sur le site
                imbehindmyhead.com.<br/><br/>
                Ces tarifs sont fermes et non révisables pendant leur période de validité mais le Vendeur se réserve
                le droit, hors période de validité, d’en modifier les prix à tout moment.<br/>
                Les prix ne comprennent pas les frais de traitement, d'expédition, de transport et de livraison, qui sont
                facturés en supplément, dans les conditions indiquées sur le site et calculés préalablement à la
                passation de la commande.<br/>
                Le paiement demandé au Client correspond au montant total de l'achat, y compris ces frais.
                Une facture est établie par le Vendeur et remise au Client lors de la livraison des Produits
                commandés.
            </div>
            <div><br/>ARTICLE 3 - COMMANDES<br/></div>
            <div>
                Il appartient au Client de sélectionner sur le site imbehindmyhead.com les Produits qu'il désire
                commander, selon les modalités suivantes :<br/>
                Le client choisit un produit qui apparaitra dans son panier, il pourra modifier ou supprimer l'article du
                panier à tout moment avant de valider sa commande et d'accepter les présentes conditions générales
                de vente.<br/>
                Il rentrera ensuite ses coordonnées ou se connectera à son espace et choisira le mode de livraison.
                Après validation des informations, la commande sera considérée comme définitive et exigera
                paiement de la part du Client selon les modalités prévues.<br/><br/>
                Les offres de Produits sont valables tant qu'elles sont visibles sur le site, dans la limite des stocks
                disponibles.<br/>
                La vente ne sera considérée comme valide qu’après paiement intégral du prix. Il appartient au Client
                de vérifier l'exactitude de la commande et de signaler immédiatement toute erreur.<br/>
                Toute commande passée sur le site imbehindmyhead.com constitue la formation d'un contrat conclu
                à distance entre le Client et le Vendeur.<br/>
                Le Vendeur se réserve le droit d'annuler ou de refuser toute commande d'un Client avec lequel il
                existerait un litige relatif au paiement d'une commande antérieure.<br/>
                Le Client pourra suivre l'évolution de sa commande sur le site.<br/>
            </div>
            <div><br/>ARTICLE 4 - CONDITIONS DE PAIEMENT<br/></div>
            <div>
            Le prix est payé par voie de paiement sécurisé, selon les modalités suivantes :<br/>
            - paiement par carte bancaire<br/><br/>
            Le prix est payable comptant par le Client, en totalité au jour de la pasation de la commande.<br/>
            Les données de paiement sont échangées en mode crypté grâce au protocole défini par le prestataire
            de paiement agréé intervenant pour les transactions bancaires réalisée sur le site
            imbehindmyhead.com.<br/><br/>
            Les paiements effectués par le Client ne seront considérés comme définitifs qu'après encaissement
            effectif par le Vendeur des sommes dues.<br/>
            Le Vendeur ne sera pas tenu de procéder à la délivrance des Produits commandés par le Client si
            celui-ci ne lui en paye pas le prix en totalité dans les conditions ci-dessus indiquées.
            </div>
            <div><br/>ARTICLE 5 - LIVRAISONS<br/></div>
            <div>
                Les Produits commandés par le Client seront livrés en France métropolitaine ou dans la/les zones
                suivantes :<br/>
                Livraison en France Métropolitaine et en dehors.<br/><br/>
                Les livraisons interviennent dans un délai de 30 jours à l'adresse indiquée par le Client lors de sa
                commande sur le site.<br/>
                La livraison est constituée par le transfert au Client de la possession physique ou du contrôle du
                Produit. Sauf cas particulier ou indisponibilité d'un ou plusieurs Produits, les Produits commandés
                seront livrés en une seule fois.<br/>
                Le Vendeur s'engage à faire ses meilleurs efforts pour livrer les produits commandés par le Client
                dans les délais ci-dessus précisés.<br/><br/>
                Si les Produits commandés n'ont pas été livrés dans un délai de 10 jours après la date indicative de
                livraison, pour toute autre cause que la force majeure ou le fait du Client, la vente pourra être résolue
                à la demande écrite du Client dans les conditions prévues aux articles L 216-2, L 216-3 et L241-4 du
                Code de la consommation. Les sommes versées par le Client lui seront alors restituées au plus tard
                dans les quatorze jours qui suivent la date de dénonciation du contrat, à l'exclusion de toute
                indemnisation ou retenue.<br/><br/>
                En cas de demande particulière du Client concernant les conditions d'emballage ou de transport des
                produits commandés, dûment acceptées par écrit par le Vendeur, les coûts y liés feront l'objet d'une
                facturation spécifique complémentaire, sur devis préalablement accepté par écrit par le Client.
                Le Client est tenu de vérifier l'état des produits livrés. Il dispose d'un délai de #254 Délai maximal
                pour... à compter de la livraison pour formuler des réclamations par imbehindmyhead@gmail.com,
                accompagnées de tous les justificatifs y afférents (photos notamment). Passé ce délai et à défaut
                d'avoir respecté ces formalités, les Produits seront réputés conformes et exempts de tout vice
                apparent et aucune réclamation ne pourra être valablement acceptée par le Vendeur.
                Le Vendeur remboursera ou remplacera dans les plus brefs délais et à ses frais, les Produits livrés
                dont les défauts de conformité ou les vices apparents ou cachés auront été dûment prouvés par le
                Client, dans les conditions prévues aux articles L 217-4 et suivants du Code de la consommation et
                celles prévues aux présentes CGV.<br/><br/>
                Le transfert des risques de perte et de détérioration s'y rapportant, ne sera réalisé qu'au moment où
                le Client prendra physiquement possession des Produits. Les Produits voyagent donc aux risques et
                périls du Vendeur sauf lorsque le Client aura lui-même choisi le transporteur. A ce titre, les risques
                sont transférés au moment de la remise du bien au transporteur.
            </div>
            <div><br/>ARTICLE 6 - TRANSFERT DE PROPRIÉTÉ<br/></div>
            <div>
                Le transfert de propriété des Produits du Vendeur au Client ne sera réalisé qu'après complet
                paiement du prix par ce dernier, et ce quelle que soit la date de livraison desdits Produits.
            </div>
            <div><br/>ARTICLE 7 - DROIT DE RÉTRACTATION<br/></div>
            <div>
                Compte tenu de la nature des Produits vendus, les commandes passées par le Client ne bénéficient
                pas du droit de rétractation.<br/>
                Le contrat est donc conclu de façon définitive dès la passation de la commande par le Client selon les
                modalités précisées aux présentes CGV.<br/>
            </div>
            <div><br/>ARTICLE 8 - RESPONSABILITÉ DU VENDEUR - GARANTIES<br/></div>
            <div>
                Les Produits fournis par le Vendeur bénéficient :<br/><br/>
                - de la garantie légale de conformité, pour les Produits défectueux, abîmés ou endommagés ou
                ne correspondant pas à la commande,<br/>
                - de la garantie légale contre les vices cachés provenant d'un défaut de matière, de conception
                ou de fabrication affectant les produits livrés et les rendant impropres à l'utilisation,<br/><br/>
                Dispositions relatives aux garanties légales<br/><br/>
                Article L217-4 du Code de la consommation<br/>
                « Le vendeur est tenu de livrer un bien conforme au contrat et répond des défauts de conformité
                existant lors de la délivrance. Il répond également des défauts de conformité résultant de l'emballage,
                des instructions de montage ou de l'installation lorsque celle-ci a été mise à sa charge par le contrat
                ou a été réalisée sous sa responsabilité. »<br/>
                Article L217-5 du Code de la consommation<br/><br/>
                « Le bien est conforme au contrat :<br/>
                1° S'il est propre à l'usage habituellement attendu d'un bien semblable et, le cas échéant :<br/>
                - s'il correspond à la description donnée par le vendeur et possède les qualités que celui-ci a
                présentées à l'acheteur sous forme d'échantillon ou de modèle ;<br/>
                - s'il présente les qualités qu'un acheteur peut légitimement attendre eu égard aux déclarations
                publiques faites par le vendeur, par le producteur ou par son représentant, notamment dans la
                publicité ou l'étiquetage ;<br/><br/>
                2° Ou s'il présente les caractéristiques définies d'un commun accord par les parties ou est propre à
                tout usage spécial recherché par l'acheteur, porté à la connaissance du vendeur et que ce dernier a
                accepté. »<br/><br/>
                Article L217-12 du Code de la consommation<br/>
                « L'action résultant du défaut de conformité se prescrit par deux ans à compter de la délivrance du
                bien. »<br/><br/>
                Article 1641 du Code civil.<br/>
                « Le vendeur est tenu de la garantie à raison des défauts cachés de la chose vendue qui la rendent
                impropre à l'usage auquel on la destine, ou qui diminuent tellement cet usage, que l'acheteur ne
                l'aurait pas acquise, ou n'en aurait donné qu'un moindre prix, s'il les avait connus. »<br/><br/>
                Article 1648 alinéa 1er du Code civil<br/>
                « L'action résultant des vices rédhibitoires doit être intentée par l'acquéreur dans un délai de deux ans
                à compter de la découverte du vice. »<br/><br/>
                Article L217-16 du Code de la consommation.<br/>
                « Lorsque l'acheteur demande au vendeur, pendant le cours de la garantie commerciale qui lui a été
                consentie lors de l'acquisition ou de la réparation d'un bien meuble, une remise en état couverte par
                la garantie, toute période d'immobilisation d'au moins sept jours vient s'ajouter à la durée de la
                garantie qui restait à courir. Cette période court à compter de la demande d'intervention de l'acheteur
                ou de la mise à disposition pour réparation du bien en cause, si cette mise à disposition est
                postérieure à la demande d'intervention. »<br/><br/>
                Afin de faire valoir ses droits, le Client devra informer le Vendeur, par écrit (mail ou courrier), de la
                non-conformité des Produits ou de l'existence des vices cachés à compter de leur découverte.
                Le Vendeur remboursera, remplacera ou fera réparer les Produits ou pièces sous garantie jugés non
                conformes ou défectueux.<br/>
                Les frais d'envoi seront remboursés sur la base du tarif facturé et les frais de retour seront
                remboursés sur présentation des justificatifs.<br/>
                Les remboursements, remplacements ou réparations des Produits jugés non conformes ou
                défectueux seront effectués dans les meilleurs délais et au plus tard dans les 30 jours jours suivant la
                constatation par le Vendeur du défaut de conformité ou du vice caché. Ce remboursement pourra être
                fait par virement ou chèque bancaire.<br/><br/>
                La responsabilité du Vendeur ne saurait être engagée dans les cas suivants :<br/>
                - non respect de la législation du pays dans lequel les produits sont livrés, qu'il appartient au
                Client de vérifier,<br/>
                - en cas de mauvaise utilisation, d'utilisation à des fins professionnelles, négligence ou défaut
                d'entretien de la part du Client, comme en cas d'usure normale du Produit, d'accident ou de
                force majeure.<br/>
                - Les photographies et graphismes présentés sur le site ne sont pas contractuels et ne
                sauraient engager la responsabilité du Vendeur.<br/><br/>
                La garantie du Vendeur est, en tout état de cause, limitée au remplacement ou au remboursement
                des Produits non conformes ou affectés d'un vice.<br/>
            </div>
            <div><br/>ARTICLE 9 - DONNÉES PERSONNELLES<br/></div>
            <div>
                Le Client est informé que la collecte de ses données à caractère personnel est nécessaire à la vente
                des Produits et à leur délivrance / livraison, confiées au Vendeur. Ces données à caractère personnel
                sont récoltées uniquement pour l’exécution du contrat de vente.<br/><br/>
                9.1 Collecte des données à caractère personnel<br/>
                Les données à caractère personnel qui sont collectées sur le site imbehindmyhead.com sont les
                suivantes :<br/><br/>
                Commande de Produits :<br/>
                Lors de la commande de Produits par le Client :<br/>
                Noms, prénoms, adresse postale, numéro de téléphone et adresse e-mail.<br/><br/>
                Paiement<br/>
                Dans le cadre du paiement des Produits proposés sur le site imbehindmyhead.com, celui-ci
                enregistre des données financières relatives au compte bancaire ou à la carte de crédit du Client /
                utilisateur.<br/><br/>
                9.2 Destinataires des données à caractère personnel<br/>
                Les données à caractère personnel sont réservées à l’usage unique du Vendeur et de ses salariés.<br/><br/>
                9.3 Responsable de traitement<br/>
                Le responsable de traitement des données est le Vendeur, au sens de la loi Informatique et libertés et
                à compter du 25 mai 2018 du Règlement 2016/679 sur la protection des données à caractère
                personnel.<br/><br/>
                9.4 limitation du traitement<br/>
                Sauf si le Client exprime son accord exprès, ses données à caractère personnelles ne sont pas
                utilisées à des fins publicitaires ou marketing.<br/><br/>
                9.5 Durée de conservation des données<br/>
                Le Vendeur conservera les données ainsi recueillies pendant un délai de 5 ans, couvrant le temps de
                la prescription de la responsabilité civile contractuelle applicable.<br/><br/>
                9.6 Sécurité et confidentialité<br/>
                Le Vendeur met en œuvre des mesures organisationnelles, techniques, logicielles et physiques en
                matière de sécurité du numérique pour protéger les données personnelles contre les altérations,
                destructions et accès non autorisés. Toutefois il est à signaler qu’Internet n’est pas un environnement
                complètement sécurisé et le Vendeur ne peut garantir la sécurité de la transmission ou du stockage
                des informations sur Internet.<br/><br/>
                9.7 Mise en œuvre des droits des Clients et utilisateurs<br/>
                En application de la règlementation applicable aux données à caractère personnel, les Clients et
                utilisateurs du site imbehindmyhead.com disposent des droits suivants :<br/>
                - Ils peuvent mettre à jour ou supprimer les données qui les concernent de la manière
                suivante :<br/>
                _______________.<br/>
                - Ils peuvent supprimer leur compte en écrivant à l’adresse électronique indiqué à l’article 9.3 «
                Responsable de traitement »<br/>
                - Ils peuvent exercer leur droit d’accès pour connaître les données personnelles les concernant
                en écrivant à l’adresse indiqué à l’article 9.3 « Responsable de traitement »<br/>
                - Si les données à caractère personnel détenues par le Vendeur sont inexactes, ils peuvent
                demander la mise à jour des informations des informations en écrivant à l’adresse indiqué à
                l’article 9.3 « Responsable de traitement »<br/>
                - Ils peuvent demander la suppression de leurs données à caractère personnel, conformément
                aux lois applicables en matière de protection des données en écrivant à l’adresse indiqué à
                l’article 9.3 « Responsable de traitement »<br/>
                - Ils peuvent également solliciter la portabilité des données détenues par le Vendeur vers un
                autre prestataire<br/>
                - Enfin, ils peuvent s’opposer au traitement de leurs données par le Vendeur<br/><br/>
                Ces droits, dès lors qu’ils ne s’opposent pas à la finalité du traitement, peuvent être exercé en
                adressant une demande par courrier ou par E-mail au Responsable de traitement dont les
                coordonnées sont indiquées ci-dessus.<br/>
                Le responsable de traitement doit apporter une réponse dans un délai maximum d’un mois.<br/>
                En cas de refus de faire droit à la demande du Client, celui-ci doit être motivé.<br/>
                Le Client est informé qu’en cas de refus, il peut introduire une réclamation auprès de la CNIL (3 place
                de Fontenoy, 75007 PARIS) ou saisir une autorité judiciaire.<br/>
                Le Client peut être invité à cocher une case au titre de laquelle il accepte de recevoir des mails à
                caractère informatifs et publicitaires de la part du Vendeur. Il aura toujours la possibilité de retirer son
                accord à tout moment en contactant le Vendeur (coordonnées ci-dessus) ou en suivant le lien de
                désabonnement.
            </div>
            <div><br/>ARTICLE 10 - PROPRIÉTÉ INTELLECTUELLE<br/></div>
            <div>
                Le contenu du site imbehindmyhead.com est la propriété du Vendeur et de ses partenaires et est
                protégé par les lois françaises et internationales relatives à la propriété intellectuelle.<br/>
                Toute reproduction totale ou partielle de ce contenu est strictement interdite et est susceptible de
                constituer un délit de contrefaçon.
            </div>
            <div><br/>ARTICLE 11 - DROIT APPLICABLE - LANGUE<br/></div>
            <div>
                Les présentes CGV et les opérations qui en découlent sont régies et soumises au droit français.<br/>
                Les présentes CGV sont rédigées en langue française. Dans le cas où elles seraient traduites en une
                ou plusieurs langues étrangères, seul le texte français ferait foi en cas de litige.<br/>
            </div>
            <div><br/>ARTICLE 12 - LITIGES<br/></div>
            <div>
                Pour toute réclamation merci de contacter le service clientèle à l’adresse postale ou mail du Vendeur
                indiquée à l’ARTICLE 1 des présentes CGV.<br/>
                Le Client est informé qu'il peut en tout état de cause recourir à une médiation conventionnelle, auprès
                des instances de médiation sectorielles existantes ou à tout mode alternatif de règlement des
                différends (conciliation, par exemple) en cas de contestation.<br/>
                En l’espèce, le médiateur désigné est<br/>
                _______________<br/>
                _______________<br/>
                _______________<br/>
                E-mail : _______________.<br/>
                Le Client est également informé qu’il peut, également recourir à la plateforme de Règlement en Ligne
                des Litige (RLL) :https://webgate.ec.europa.eu/odr/main/index.cfm?event=main.home.show<br/>
                Tous les litiges auxquels les opérations d'achat et de vente conclues en application des présentes
                CGV et qui n’auraient pas fait l’objet d’un règlement amiable entre le vendeur ou par médiation,
                seront soumis aux tribunaux compétents dans les conditions de droit commun.
            </div>
        </div>
    </div>
  )
}

export default Cvg