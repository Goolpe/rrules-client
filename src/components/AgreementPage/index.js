import React, { Component } from 'react';
import { FaTimes } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { UncontrolledTooltip } from "reactstrap";

class AgreementPage extends Component {
	componentDidMount() {
		window.scrollTo(0,0);
	}
  render() {
    return (
    	<main>
    		<div className="container">
					<div className="d-flex justify-content-end w-100 pt-3 pb-3" >
	          <Link className="userpage__facog mt-2 text_card" style={{height:"1.5em"}} id="TooltipSetting" to="/auth">
	            <FaTimes size="1.5em"/>
	          </Link>
	          <UncontrolledTooltip className="mr-2" placement="left" target="TooltipSetting">
	            Авторизация	
	          </UncontrolledTooltip>
	        </div>
		    	<div className="shadow bg_card text_card p-5 w-100 m-auto">
		    		<h1>Пользовательское соглашение (далее соглашение)</h1>
		    		<hr />
		    		<p className="text-justify">
			    		<span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo sint, obcaecati tenetur aperiam iusto tempore nobis, amet, temporibus natus corporis ad doloremque. Ut eos est beatae dolore quia consequatur earum.</span>
			    		<span>Doloribus sapiente tempore rem expedita iusto laboriosam necessitatibus voluptas! Sequi fugit, doloribus delectus voluptatibus quo, inventore nemo laborum, ratione non dignissimos voluptatem? Accusantium modi aliquid quibusdam quia cupiditate nam culpa.</span>
			    		<span>Ex rem repudiandae voluptatibus sed, inventore voluptate doloremque similique mollitia iusto. Beatae rem, aspernatur nostrum repudiandae odit quis doloribus ipsa tempora facilis earum non, repellat, mollitia impedit nulla repellendus quia.</span>
			    		<span>Deserunt, similique veritatis quisquam quae cumque harum optio. Obcaecati dolore suscipit perspiciatis in laboriosam, doloremque officia minima modi, delectus non quas nulla ratione! Natus in, hic culpa voluptate dolorem maxime.</span>
			    		<span>Maiores dolor officia sed quas, nam suscipit nisi expedita quaerat illum error consequatur, quod, totam modi fugit enim itaque. Asperiores nobis fugiat aut eligendi dolorum provident officia sapiente distinctio? Est.</span>
			    		<span>Saepe pariatur alias nostrum! Reiciendis necessitatibus corporis illum accusamus, tempore tenetur, animi nulla molestiae, ut ipsa porro dolor sequi. Quo quaerat, ex perferendis hic voluptatibus doloribus nesciunt tenetur eum minima.</span>
			    		<span>Facilis reiciendis est fugit consectetur dolor possimus ab laboriosam dolorem similique aut autem ipsam cum eaque unde, nobis perspiciatis, inventore. Illo corporis excepturi, placeat dicta non natus rerum expedita. Consequuntur!</span>
			    		<span>Veniam quos nesciunt cupiditate atque ea repudiandae cum nobis repellat quisquam maxime voluptates unde distinctio quae culpa voluptate deleniti, ex explicabo doloremque similique debitis quidem, assumenda earum. Similique, iure, et.</span>
			    		<span>Asperiores, quam! Dolorem sit cum, architecto odit, velit soluta, dolores recusandae impedit voluptate commodi sunt deserunt possimus totam, repellat laboriosam ratione placeat labore deleniti culpa modi minima eligendi. Maiores, incidunt.</span>
			    		<span>Quos voluptatem accusamus praesentium sint ipsam, odit sed ut! Eius voluptatibus eaque unde iure accusamus distinctio voluptatum optio expedita nam eum repudiandae tempore blanditiis rem, veniam animi necessitatibus ad natus!</span>
			    		<span>Similique enim dolorem repudiandae eum nulla perspiciatis, earum, asperiores cum, officiis nihil sint aperiam! Temporibus modi alias non delectus, nulla corrupti. Omnis dolor magni nulla quae, eligendi quam! Non, sequi?</span>
			    		<span>Pariatur qui officiis praesentium animi eius atque molestias. Ipsa iusto similique, in, amet adipisci accusamus voluptatum, ipsam commodi aut quidem nostrum quasi possimus corporis esse delectus. Doloremque placeat ullam fugiat.</span>
			    		<span>Dignissimos nulla dolor maiores vero itaque quisquam neque ab molestiae, maxime atque a, sit ut est porro! Saepe eum commodi ea totam aliquid ad fugit ratione recusandae, voluptatibus nihil ipsum.</span>
			    		<span>Voluptatum tempora illum facilis neque odit tempore laboriosam officiis nihil fuga, dignissimos magnam laudantium sapiente quae! Nobis veniam officia omnis repellat soluta minus, labore, aliquam delectus error est! Deleniti, culpa.</span>
			    		<span>Magnam repellat consequuntur temporibus inventore nihil quae facilis ex error hic natus autem ad voluptatibus laboriosam, commodi vero at qui distinctio vitae, molestiae? Nam numquam tempore magnam aspernatur cumque quaerat.</span>
			    		<span>Autem minus minima, quisquam eius dicta error officia tenetur accusamus, quaerat optio enim cum quae perspiciatis. Incidunt, tenetur! Libero earum ut molestiae mollitia quaerat suscipit iusto nesciunt accusantium animi laboriosam.</span>
			    		<span>Velit quia repudiandae exercitationem qui soluta nam tempore quibusdam obcaecati corporis distinctio, vitae et consequatur eum natus, eius nostrum fuga ab repellat nulla. Eius similique aut, fugiat saepe adipisci debitis.</span>
			    		<span>Temporibus tempora, recusandae illum ipsam, necessitatibus perferendis. Quia totam nulla fuga facilis eum accusantium praesentium ut rem quo amet pariatur, commodi ex dolore veritatis aliquam minus, tempora fugiat tenetur ipsa.</span>
			    		<span>Consectetur quam, mollitia! Dolor rem quaerat omnis, repellendus quasi laboriosam eaque officiis cum aliquid id perspiciatis ea minima nulla odit excepturi, eos accusamus aut, et explicabo, ipsa modi eveniet culpa.</span>
			    		<span>Natus hic expedita, dolor sunt veritatis, autem perspiciatis labore consequatur suscipit. Quaerat labore impedit expedita atque, dolores quibusdam maxime laborum ex qui accusamus amet dolore ad temporibus, tenetur laudantium nostrum.</span>
			    		<span>Dolorum nam veniam, fuga distinctio eum aperiam ad aliquam neque. Ex eligendi magnam blanditiis aspernatur, impedit pariatur, accusantium esse soluta a illo provident neque ipsa, eaque quibusdam repudiandae distinctio quisquam!</span>
			    		<span>Iste ducimus quo molestiae possimus dolorem nemo libero saepe, quibusdam incidunt expedita alias, magnam at, nisi obcaecati laborum ut explicabo, quasi fugit maxime et ullam quidem veniam qui. Dicta, consectetur.</span>
			    		<span>Excepturi magnam similique, eligendi quod consequatur sit provident velit deleniti accusantium suscipit nam repellat sunt, modi vitae minus doloribus. Eum delectus eveniet numquam nisi quos fugit laborum necessitatibus, culpa, odio.</span>
			    		<span>Dolore quos reiciendis saepe asperiores minus eaque vitae deleniti dolorem delectus impedit quisquam consectetur fugiat et iste a quasi accusamus reprehenderit earum iure nulla voluptatem ipsum, ab explicabo sapiente! Numquam.</span>
			    		<span>Tempore deleniti consequatur velit voluptatum possimus iusto beatae ratione itaque, ipsa cum labore odio eum quo consequuntur qui, debitis blanditiis modi voluptas sint. Quis, maxime, ratione. Fugit quo quas tenetur.</span>
			    		<span>Accusantium vero delectus voluptatibus vitae hic facere quaerat quod sunt, repellendus magnam, iste quasi commodi consectetur tenetur nemo quam officia quae ab, id porro perspiciatis placeat nisi, non iusto quia.</span>
			    		<span>Quam eveniet nesciunt laborum possimus, ullam, qui minima dolores voluptas ipsum voluptatum cumque cupiditate enim, perspiciatis tempore. Ipsam, nisi, sapiente. Possimus quae hic, atque iure ad vel quam error deleniti?</span>
			    		<span>Voluptate perspiciatis deleniti suscipit, reprehenderit labore ipsum consequuntur assumenda doloremque explicabo, nobis autem quia magni rem hic quas sint ex pariatur? Perspiciatis enim rerum exercitationem nemo magnam cumque, saepe pariatur!</span>
			    		<span>Quod vitae nam vero tenetur, maxime molestias totam ut culpa illum atque labore repudiandae voluptas iure fuga maiores a modi deserunt inventore, dolorum perferendis vel, harum soluta natus. Similique, eos!</span>
			    		<span>Illo corrupti, facere sit neque repellendus adipisci amet deserunt sapiente quas impedit, quasi repellat, dignissimos eius ad soluta ullam alias optio atque laboriosam corporis odio esse sequi, deleniti laborum in.</span>
			    		<span>Numquam fugit odit, obcaecati facere! Quo eligendi suscipit sint laborum assumenda consequatur doloribus quam quis quidem. Minima nobis itaque ut temporibus corporis soluta tenetur, nostrum fuga illum. Deserunt voluptate, consequatur!</span>
			    		<span>Nam, laborum, vero? Nemo corporis iste, sapiente modi quisquam id veniam commodi dolor exercitationem doloremque. Aperiam debitis commodi ducimus, adipisci sequi accusantium fugit, ullam totam quas voluptas dignissimos dolores. Deserunt!</span>
			    		<span>Atque soluta pariatur corporis ab consequatur doloremque delectus aut. Excepturi aut dolorem magni deserunt ipsa id, eaque quisquam vitae, ad tempore accusamus quis eligendi, suscipit, laborum est! Autem, deleniti, porro?</span>
			    		<span>Omnis, perferendis labore numquam provident possimus autem ex dolor architecto qui quae laborum deserunt. Voluptatum repellendus eaque labore, facere provident eum aut mollitia vel nam autem nulla ex id eos.</span>
			    		<span>Minus aut exercitationem accusantium excepturi, nemo voluptate illum doloribus suscipit hic dignissimos, vitae iusto impedit nostrum maiores, officiis distinctio dolor ad recusandae ab error, similique explicabo porro odit ducimus autem.</span>
			    		<span>Commodi, blanditiis. In nihil atque quo, ad officiis labore deleniti. Nobis veritatis accusamus recusandae odio ab illum aspernatur, assumenda, quia repellendus autem, beatae sit, sint asperiores inventore a ipsa provident.</span>
			    		<span>Quidem labore omnis facere cum praesentium placeat ipsam eveniet perspiciatis, nihil nam? Consequatur animi, ipsum sapiente magni, quam facere architecto minima cupiditate laboriosam, velit quaerat! Doloribus, sint, quasi! Id, alias.</span>
			    		<span>Ab quo, mollitia dolore iure sunt eveniet quam modi ut. Libero animi, eius possimus vitae voluptas a, dolorem magnam deleniti. Maiores qui sint et vel quod numquam est aliquam, quam.</span>
			    		<span>Vero asperiores molestias fugit nisi debitis, odio, culpa dignissimos, vel iusto, blanditiis dolor? Laborum minus molestiae ipsum, fugiat? Perferendis beatae ducimus adipisci, nulla quasi obcaecati eaque eum ex consequatur labore!</span>
			    		<span>Tempore blanditiis nobis veniam! Exercitationem sapiente ratione in dolorem saepe. Unde ducimus quasi in cumque. Natus magni perferendis vel nam ipsa nesciunt, voluptates minima, deleniti aperiam, officiis accusamus quos nisi.</span>
			    		<span>Enim libero pariatur nostrum deserunt maxime repellendus ut nulla debitis ducimus mollitia voluptatibus, blanditiis perspiciatis tenetur doloremque eaque ipsum minus laborum error dolorem sit, provident dolores eius animi cum quod.</span>
			    		<span>Magnam dignissimos minima neque? Delectus quos minus earum fugit, optio nostrum dolorem repudiandae consequatur laboriosam voluptates debitis veritatis ullam quidem? Illo, repellat? Magnam alias explicabo quo atque minima sequi, modi.</span>
			    		<span>Architecto ipsa asperiores sint officia officiis minus quo iusto sed illum, dolorem ea accusamus, dicta provident dolore totam quidem autem ducimus excepturi nihil sapiente itaque, consectetur odit. Nam, eos, porro.</span>
			    		<span>Necessitatibus voluptatum recusandae ex odit totam repellendus quisquam magni veniam molestias saepe, error hic, nemo tempore eum illo reiciendis dolorum fuga officia vitae. Id, dolor quos aliquid ducimus debitis doloribus.</span>
			    		<span>Eius aspernatur ullam nemo harum voluptas architecto unde, soluta, assumenda ipsa voluptates odio, eaque commodi enim! Quaerat, similique aspernatur praesentium nisi corporis nobis ut quo sint. Iure beatae autem id?</span>
			    		<span>Eveniet et consectetur amet voluptate ipsa distinctio alias quis laboriosam tenetur, dolore totam iure, sit omnis commodi blanditiis vel suscipit, facilis nisi nobis! Recusandae omnis corporis molestiae reiciendis, nostrum harum.</span>
			    		<span>Unde enim, expedita. Architecto ut velit earum, iure unde eos corporis ducimus nostrum similique incidunt nihil, facilis sit dolorum nobis qui, voluptate id debitis aliquid doloribus. Dolores perspiciatis ratione, incidunt.</span>
			    		<span>Ea, non corrupti consequatur ducimus voluptatum repellat itaque aliquam nam eius sequi minima voluptatem, maxime ex magnam! Ullam laudantium nisi, ut voluptates aperiam tempora in autem atque libero nobis. Vel.</span>
			    		<span>Aspernatur est minus quibusdam optio eveniet quod necessitatibus error repellendus architecto consequatur, nemo id ipsum itaque neque laborum voluptatem impedit ratione ullam atque porro culpa adipisci! Aperiam ad, quam. Laudantium.</span>
			    		<span>Quidem iure, eaque ut sapiente. Sit inventore quis nihil ut magni aspernatur hic, officia iusto velit officiis! Rem porro sapiente, at maiores perferendis corporis error ad possimus alias expedita asperiores?</span>
			    		<span>Impedit qui praesentium sed consequuntur! Quidem saepe, ipsum error dicta veritatis eos, provident doloremque corrupti corporis illum magni animi porro nam obcaecati ex! Ad eius tenetur, magnam unde, nostrum corporis?</span>
			    		<span>Quae, maiores minima? Veritatis consectetur dignissimos saepe dolorum sapiente. Aperiam asperiores odio ab, repudiandae expedita magnam distinctio odit, quaerat obcaecati corporis numquam, laudantium tempore architecto! Corporis exercitationem est, quasi odit.</span>
			    		<span>Explicabo quidem qui accusantium eum exercitationem, sit, voluptatem, mollitia distinctio inventore quisquam at aliquid a nam dignissimos enim cupiditate! Deserunt ab ut laboriosam fugiat odit eligendi minus, consequatur numquam commodi?</span>
			    		<span>Eos possimus aliquam minus. Illo minima vitae perspiciatis deleniti debitis laudantium enim repudiandae autem, at modi obcaecati quam ad ducimus ut quod! Corporis, assumenda reprehenderit, dolor molestiae at labore beatae?</span>
			    		<span>Esse veritatis, corrupti inventore dolor ipsum sapiente iusto rem, doloribus numquam minus laudantium libero iure sed. Impedit laborum sit nihil cumque repellat facilis necessitatibus obcaecati vero, ducimus at, dignissimos a?</span>
			    		<span>Dolor dolore, quisquam eligendi a et ducimus porro perspiciatis, repellendus, eveniet ratione consectetur. Ex eligendi temporibus porro, dolorem eum. Debitis quis officiis placeat libero nulla laudantium repellat cum quidem recusandae.</span>
			    		<span>Vero sit eaque quis itaque magnam inventore ab. Quod aut dolores modi, rerum ipsa accusantium aliquam possimus minima veritatis. Ad earum quibusdam odio temporibus similique deleniti numquam, omnis consequatur. Accusamus?</span>
			    		<span>Voluptatum repellendus tempora sapiente, eaque consequuntur repudiandae temporibus ex dolores ducimus cumque commodi itaque voluptatibus aliquam, quidem doloremque vero libero obcaecati delectus, fugiat error eveniet! Architecto dolores eum, eos provident.</span>
			    		<span>Rerum facere necessitatibus autem aliquam vel corrupti animi, aspernatur sunt quisquam pariatur! Delectus, repudiandae, quo. Reiciendis inventore rem error suscipit, sit quia sint facilis totam vero consectetur, dolores at deserunt.</span>
			    		<span>Iusto incidunt corporis illum consequatur distinctio adipisci iure necessitatibus modi non, cum saepe, expedita enim sequi totam libero! Labore assumenda perferendis velit repellendus nobis aut itaque voluptas aperiam voluptatem doloribus.</span>
			    		<span>Perferendis eaque assumenda blanditiis vero soluta iure aliquam, odio eveniet! Libero voluptates ratione, natus quia sit enim. Sed itaque error voluptate aspernatur earum ex quibusdam sunt molestias modi. Eum, reiciendis!</span>
			    		<span>Illo iusto mollitia alias ea laborum cum totam, quod molestias quia optio praesentium. Magnam illum earum facilis vitae sint vel, aut assumenda, odio, molestias nisi provident. Corporis ea aut, ad.</span>
			    		<span>Eligendi dolorem adipisci rem officia non blanditiis, asperiores repellat quos fugiat repellendus nam officiis consectetur! Culpa dignissimos minus reiciendis iste placeat error perspiciatis dolore. Itaque illo voluptatibus animi est adipisci.</span>
			    		<span>Laboriosam possimus blanditiis, consequatur quidem sapiente temporibus! Assumenda nam, suscipit harum cupiditate ipsum voluptatem officiis dolorum quia recusandae voluptate reprehenderit debitis reiciendis eligendi, rem hic, asperiores consequuntur. Eaque, impedit, deserunt!</span>
			    		<span>Nobis laboriosam natus error! Officiis similique repudiandae ipsa suscipit rem sunt facere natus beatae officia nostrum! Labore sapiente cum ipsam maxime qui libero, a aliquam, in quis laboriosam, perspiciatis harum.</span>
			    		<span>Repellendus pariatur similique ad itaque, nihil quia dolore debitis placeat nostrum. Voluptates placeat commodi iure, rerum neque at beatae! Sequi voluptatum consequatur eum facere quam fuga deserunt pariatur quisquam, nobis.</span>
			    		<span>Sequi numquam libero, debitis dolores voluptatum sapiente fugit incidunt doloremque maiores aspernatur voluptate! Provident sit, quis minus officiis officia eveniet ullam nostrum necessitatibus numquam vel aperiam aliquid nihil natus in.</span>
			    		<span>Ipsum omnis, quia vero, sequi, veritatis esse mollitia iste perspiciatis voluptatem temporibus ab quos ad nostrum eos deserunt fugiat dolorem eum sapiente ut sint? Obcaecati accusamus incidunt, porro corporis ex!</span>
			    		<span>Dolores provident dolor eveniet ullam, praesentium quasi repellat deleniti, incidunt veritatis nesciunt fugit alias, eos natus tenetur deserunt, esse quo minus. Pariatur nisi, laudantium rerum vel facilis harum labore optio.</span>
			    		<span>Reprehenderit minus, ex, accusantium facilis ipsa et quisquam consequuntur consectetur nemo excepturi ut ad ullam perferendis laboriosam eaque nulla magnam, fugit eveniet odio dolore illum! Pariatur, mollitia sunt in voluptate?</span>
			    		<span>Dolorem delectus, omnis sapiente officiis non itaque ut molestias. Officia fugiat maxime autem velit consectetur doloribus maiores incidunt earum omnis, adipisci atque aspernatur quaerat, mollitia vitae illo similique facere eius!</span>
			    		<span>Labore laudantium natus expedita perspiciatis voluptatum magnam possimus eius, reprehenderit odio molestiae necessitatibus maxime aspernatur, numquam enim consectetur culpa saepe assumenda quas praesentium nihil dolor harum. Aliquid, molestiae animi perspiciatis.</span>
			    		<span>Aliquid modi labore molestiae quasi incidunt ratione atque, quisquam, velit aspernatur expedita ducimus! Asperiores tempora laborum incidunt optio. Laudantium eligendi autem deserunt rerum facilis id veniam ex, consectetur a quo?</span>
			    		<span>Amet, quasi possimus placeat consectetur est sunt eius. Commodi in quod, saepe ipsum ullam asperiores, voluptatibus deleniti ipsam. Nisi id quam aut, officiis eveniet maxime? Voluptatem veniam quod quam facere.</span>
			    		<span>Sit iusto quis, atque officiis, excepturi placeat. Quis dolorem, labore aperiam amet repellendus rerum aliquam, suscipit quos quam asperiores sit similique tempore itaque, doloribus eum cupiditate eligendi omnis earum? Ipsa.</span>
			    		<span>Nam blanditiis illum, voluptate, nulla dolores ipsum expedita id laboriosam consequuntur fuga necessitatibus. Eum non, doloribus adipisci reprehenderit facere vitae quisquam, ex odit alias delectus molestiae aspernatur nobis, neque laborum!</span>
			    		<span>Iusto eum dolorem libero minus, nulla placeat quia nesciunt, accusantium iure delectus porro sit facere atque tempore asperiores, repellendus veritatis! In sequi velit quo, magni odio doloribus consequuntur ex consequatur.</span>
			    		<span>Hic, officia. Fugit, recusandae explicabo, laboriosam et officia nobis a, velit est fugiat iure eius. Ab corrupti, iusto! Ex, quisquam voluptate officiis voluptatibus aliquid amet eveniet fuga hic pariatur dolor.</span>
			    		<span>Nesciunt culpa qui illo perspiciatis debitis mollitia sit est aspernatur architecto vel impedit tenetur, tempore rerum quas cum earum labore cumque doloremque enim voluptate fuga quia repellendus non perferendis ipsam.</span>
			    		<span>Qui excepturi iure iste, molestiae sapiente alias labore consequuntur nihil ad facilis ea quidem cupiditate laboriosam recusandae saepe totam quam quia ut quaerat. Tempora nesciunt asperiores cupiditate, dignissimos recusandae placeat!</span>
			    		<span>Vel totam soluta ipsum debitis iste dolorum illo sequi, id, amet impedit minima omnis neque rem blanditiis molestias dolor delectus odit laboriosam esse laudantium dolore earum. Quo, magni, repudiandae. Voluptas!</span>
			    		<span>Commodi at tenetur repellendus quae, delectus. Mollitia natus consectetur itaque rerum delectus, a perspiciatis possimus vero. Accusantium doloremque consequatur ex quam sed sint facere, beatae repellat officia consequuntur hic impedit.</span>
			    		<span>Molestias impedit reiciendis laboriosam saepe dolorem, quo deleniti. Totam nam, odio voluptas voluptates iure aspernatur in. Nobis culpa suscipit quo aperiam amet voluptates, quis voluptatem, ullam nesciunt omnis minima eveniet.</span>
			    		<span>Nemo magnam, natus suscipit nam rem, fugiat enim quis illum, quas officiis nobis minima. Dolore, a temporibus commodi. Natus quo magni hic rerum doloremque, adipisci excepturi, officiis iste! Corporis, non.</span>
			    		<span>Nobis voluptatem aut reprehenderit quisquam, vero soluta eligendi quis nihil ratione cumque numquam magnam ipsam eaque, placeat ea pariatur, maiores sint repellat rem. Nulla quo hic, sequi eius ratione corrupti!</span>
			    		<span>Distinctio placeat incidunt praesentium sit earum est veniam deserunt quaerat aliquam, fugiat qui iste eaque, debitis. Similique explicabo, quidem soluta recusandae, quaerat debitis totam commodi laboriosam veritatis hic in non.</span>
			    		<span>Aut labore odit placeat ut veniam magni accusantium illo earum inventore repellendus, velit at commodi, incidunt veritatis molestiae ex assumenda reiciendis magnam nisi, aliquam minima esse debitis! Adipisci suscipit, deleniti.</span>
			    		<span>Accusamus soluta dolor nobis possimus error quo perferendis aliquam corporis recusandae officia placeat expedita, praesentium ipsum molestiae maiores quibusdam voluptates nostrum, deserunt aut facilis optio. Ipsam aperiam eveniet saepe commodi?</span>
			    		<span>Ab, nobis impedit animi ad quidem, inventore itaque facilis quod veniam sed nisi, officiis esse? Rem quasi, vero vitae consectetur! Doloribus amet enim nisi commodi magni soluta unde explicabo expedita.</span>
			    		<span>Ratione amet reprehenderit totam assumenda blanditiis debitis commodi magni obcaecati alias quam optio architecto, fuga nostrum? Quaerat, reprehenderit nemo atque quo ipsum. Voluptatem repudiandae quasi eligendi ipsum autem velit rerum?</span>
			    		<span>Repellat, dolorum. Deleniti perferendis non eveniet vero optio accusamus esse error voluptatem quas hic. Molestias officiis, dolore doloremque eligendi, excepturi animi placeat sint consequatur debitis ullam eveniet dicta, cupiditate non.</span>
			    		<span>Molestias similique culpa incidunt nobis, tenetur delectus, quia quaerat atque labore laborum nostrum eaque neque eveniet, assumenda, accusantium facilis pariatur minus nihil suscipit rem blanditiis. Illo est architecto maiores, alias?</span>
			    		<span>Eaque velit iure modi quas, odit minima nemo blanditiis provident aliquid ex dolorem delectus ducimus dignissimos illo distinctio consequuntur explicabo, et at dolores. Ipsum laborum molestias quos quia, perferendis repellendus.</span>
			    		<span>Porro quo distinctio quia, ab quibusdam iusto maiores consectetur quidem illo eum, nemo commodi similique amet unde quaerat, debitis fugiat cumque delectus consequatur pariatur rerum corrupti neque laudantium! Soluta, alias!</span>
			    		<span>Quis maxime reprehenderit, tempora quas. Rem ipsam obcaecati doloremque eius reiciendis, culpa accusantium totam aperiam perferendis odio illum quaerat debitis, tempora fuga, ipsum nobis odit explicabo? Facere quae consequuntur ipsam.</span>
			    		<span>Non doloremque minus nisi dolore eveniet fugiat voluptatem, iusto, reprehenderit ullam quidem, assumenda perspiciatis a doloribus reiciendis accusantium ducimus, adipisci. Itaque cumque vitae nobis. Deleniti minima error culpa ea tenetur.</span>
			    		<span>Ipsum aperiam accusantium sapiente quos accusamus necessitatibus esse corporis nam, unde aut saepe, dicta, natus in et excepturi ut facere dolores est. Earum, nostrum commodi odit quis, fugiat quos laboriosam.</span>
			    		<span>Saepe et veritatis velit culpa, tempora deserunt possimus laborum totam, voluptatum repudiandae. Asperiores reprehenderit quam omnis ipsam et, sed aliquam minus provident, amet eligendi aliquid saepe odit laborum debitis error.</span>
			    		<span>Nulla omnis commodi ipsa sed eaque, voluptatibus? Esse, veritatis similique laboriosam omnis nesciunt. Fugiat rem nostrum dolorum quidem nesciunt illum totam doloremque odio distinctio explicabo veritatis maxime, quisquam, laboriosam quam.</span>
			    		<span>Voluptatibus voluptate odit quo libero ipsam maiores. Repellendus sunt, eius neque ipsa nulla rerum fuga, nobis. Cumque sapiente, assumenda ipsa recusandae. Officia magnam doloremque obcaecati ipsa ut, provident vel odio!</span>
			    	</p>
		    	</div>
		    </div>
    	</main>
    )
  }
}

export default AgreementPage;
