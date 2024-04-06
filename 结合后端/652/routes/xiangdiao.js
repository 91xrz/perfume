const { Op } = require('sequelize');
const per=require('../Models/perfumeMod');
var express = require('express');
var router = express.Router();



router.get('/:type',async (req, res) =>{
    const {type}=req.params;
    let TYPE=type;
   let xiangdiaoPattern;
   let title;
   let description;
    let recommendationTitle;
    let imageUrl;
     switch (type) {
      case 'guoxiang':
        xiangdiaoPattern = '%果香%';
        title = '果香调 Fruity';
        description = [ '果香调香水包括所有柑橘类以外的水果为核心的香水。果香调香水通常包含多种热带水果,也包括常见的桃子,梨,苹果,李子,草莓等。果香调香水经常搭配花香、绿叶,使香水变得活泼、年轻。',
        '果香调可以细分为:单一果香调、相似果香调。单-果香调指一种水果的香味。 相似果香调指多种气味邻近的水果的统称。',
        '相似果香调中的菠萝、芒果、百香果等，被称为热带水果(tropical fruits note) ;蓝莓、树莓、黑仑等,则被称为红色水果(red fruits note)。',
        '由于柑橘类以外的天然水果无法提取精油，所以水果香气只能靠人工模拟,容易带来化工感。'
            ];     
            recommendationTitle='果香调香水推荐';
            imageUrl= '/static/image/果香调.webp';
        break;
        case 'huaxiang':
        xiangdiaoPattern = '%花香%';
        title = '花香调 Floral';
        description = [ '花香调是最庞大的香调家族，香水数量最多。花香调可以细分为两种:多种花香、单-花香。此外还有流行的三个子类别:轻柔花香调、方花香调、绿叶花香调。',
        '顶空气体萃取技术(Headspace Technology)可以分析并克隆任何花朵所散发的气味,这些气味是传统精油提炼方法无法提取的。这种技术极大地扩展了花香调香水家族。'];
        recommendationTitle='花香调香水推荐';
        imageUrl='/static/image/花香调.webp';
        break;
        case 'ganju':
         xiangdiaoPattern = '%柑橘%';
            title = '柑橘调 Citrus';
            description = ['柑橘调是最古老的香调，也是传统古龙水的香调。柑橘调闻起来清新宜人，所以它是所有香调中气味接受度最高的一种。',
            '柑橘调的起源，可以追溯到历史上古龙水的诞生。1709年， 意大利人Giovanni Maria Farina发明了世界上第一款古龙水, 叫做"科隆之a水eau de Cologne"。因同时满足芳香调和柑橘调的特征，它被划分为芳香柑橘调。它是第一款柑橘调香水， 也是第一款芳香调香水。',
            '柑橘调香水主要以柑橘类香料一也就是芸香科柑橘属水果为核心香料。 柑橘属水果包含:柠檬、香柠檬、橙子、橘子、葡萄柚等。',
        '此外,橙花油、苦橙叶、柠檬马鞭草,这些气味闻起来类似柑橘的香料,也被归为柑橘类香料。',
    '柑橘属水果的精油通常是从果皮中提取的，在香水中广泛应用。市面上80%的香水中都或多或少含有柑橘类香料。比如馥奇调、西普调就经常用柑橘来表现一些比较清爽的细节特征。',
'柑橘类香料也有不可忽视的缺点，那就是留香时间短。所以柑橘经常被用在众多香水的前调中，为香水带来清新且有穿透力的开场。只使用柑橘类香料的纯柑橘香水并不多，柑橘经常与芳香植物结合成芳香柑橘调。',
'由于柑橘类香料结构不稳定，容易氧化变质。香水中的富含柑橘成分的前调，在长期存放中，往往最先变质或气味丧失。柑橘调的也香水不宜存放过久，最好在3-5年内使用完。'];
            recommendationTitle='柑橘调香水推荐';
            imageUrl= '/static/image/柑橘调.webp';
            break;
        case 'lvye':
            xiangdiaoPattern = '%绿叶%';
            title = '绿叶调 Green';
            description = ['绿叶调，或称“绿调”、"绿香调”， 常以树叶或青 草所散发出的辛辣绿色香气,作为主旋律。绿叶调是对西普调更轻盈、更现代化的演绎。',
            '绿叶调的主要气味成分为: 1.绿草、树叶2.青涩蔬菜3.芳香类植物，如迷迭香、薄荷、百里香、白松香。',
        '绿叶调最常用的原料是白松香和紫罗兰叶，此外还有叶醇、女贞醛、醋栗芽、依兰等。薄荷和紫苏,是近几年新兴起的绿叶调原料。',
    '绿叶调常与花香混合，散发的香气令人联想到绿意盎然的大自然。1947年的巴尔曼 绿风( Balmain Vent Vert)是绿叶花香调的典型代表。'];
            recommendationTitle='绿叶调香水推荐';
            imageUrl= '/static/image/绿叶调.webp';
            break;
         case 'shuisheng':
            xiangdiaoPattern = '%水生%';
            title = '水生调 Aquatic';
            description = ['水生调的香水通常闻起来像海风、湿润的空气，或含有水生植物，给人以十分清新怡人的感觉。水生调的诞生离不开人工香料西瓜酮Calone在香水工业中的应用。西瓜酮具有清新、湿润的海风气息和淡淡的西瓜味。',
            '第一支使用了西瓜酮的香水是雅男仕新西部男士Aramis New West for Him,同年大卫杜夫冷水男士Davidoff Cool Water.上市。从此，水生调这个全新的家族诞生了。',
        '水生调容易让一部分感到“晕香”，因为水生调的主要元素:雨水、海洋等，都是抽象的气味，无法从自然界中直接获取,只能靠人工合成。所以大剂量的人工香料以及化工感会让人感到晕香。'];
            recommendationTitle='水生调香水推荐';
            imageUrl= '/static/image/水生调.webp';
            break;
            case 'fuqi':
            xiangdiaoPattern = '%馥奇%';       
            title = '馥奇调 Chypre';
            description = ['馥奇(Fougere) 这个名词取自一个早已停产的香水一皇 家馥奇(Fougere Royale)。这款香水由调香师Paul Parquet创作于1882年，由霍比格恩特公司(Houbigant) 发行。这款香水在历史上首次使用了人工香料香豆素(1868年首次合成)，所以它也标志着现代香水工业的开端。',
            '馥奇调具有类似蕨类植物的强烈草本和木质气味，常见于男士香水。传统馥奇香调通常以薰衣草、香豆素、 橡木苔为基调。',
        '馥奇调与西普调在结构和气味上都比较类似，都含有橡木苔。这两种香调可以按核心香料来区分，如果薰衣草占据主导，则是馥奇调;如果广藿香占据主导,则是西普调。',
    '因为橡木苔的禁令，传统馥奇的时代已经过去，人们也在不断探寻着新方向。在近些年兴起的现代馥奇调中，还会把传统的薰衣草替换成其他芳草植物，比如鼠尾草、薄荷等，如祖玛珑鼠尾草与海盐、蒂普提克薄荷之水就是新时代的馥奇香调。'];
            recommendationTitle='馥奇调香水推荐';
            imageUrl='/static/image/馥奇调.webp';
            break;
          case 'pige':
            xiangdiaoPattern = '%皮革%';       
            title = '皮革调 Leather';
            description = ['皮革调的香水数量很少，以男香居多，包含柔软的花香皮革和浓烈的烟熏皮革。皮革调香水通常与蜂蜜、烟草、木质搭配，营造出成熟、阳刚、野性的风格。',
            '香水与皮革的渊源，最早可追溯于1 6世纪的芳香皮革手套。香水浸泡过的皮革手套是当时巴黎贵族们的时尚单品。',
        '如今的皮革调香水已经脱离了以桦木焦油为主的传统风格,有了更多元的表现手法。具有动物气味的海狸香、类似皮革气味的金合欢、苏合香、劳丹脂等香料,都可以用来表现皮革。例如香水中新兴的麂皮,就是一种柔软粉质的新式皮革气味。'];
            recommendationTitle='皮革调香水推荐';
            imageUrl='/static/image/皮革调.webp';
            break;
            case 'muzhi':
            xiangdiaoPattern = '%木质%';
            title = '木质调 Woody';
            description = ['木质调香水数量众多，气味温暖干燥。含有木质气味或类似感受的香水都可以归入这个香调。木质是绝对的主角,其他元素相对较弱。',
            '木质类香料由于其出色的留香时间，通常出现于香水的中后调。常见的木质调香水通常使用雪松、广藿香、松木、檀香木以及香根草等香料。此外,芳香植物(鼠尾草、迷迭香,莳萝等)和柑橘类香料,经常搭配出现。顶空气体萃取技术的发明,使得传统的木质调香水有了更多的创作空间。'];
            recommendationTitle='木质调香水推荐';
            imageUrl='/static/image/木质调.webp';
            break;
            case 'dongfang':
            xiangdiaoPattern = '%东方%';
            title = '东方调 Oriental';
            description = ['东方调，因常用温暖甜美的琥珀及树脂，又称琥珀调Amber,是香水界中最具异国风情的香调。',
            '东方调的兴起，源于中世纪以后欧洲开辟对外贸易的新航线后，大量东方香料的涌入。调香师试图通过香料营造他们眼中的“东方世界”，起初主要为中东地区、印度等，后来也延伸至缅甸、中国、日本。',
        '中世纪以后，欧洲开辟对外贸易的新航线后，大量东方香料涌入欧洲，引发了人们对“东方世界”的想象，也让调香师以此为灵感,开创了东方调香水。',
    '东方调香水通常包含香草、琥珀、各类树脂、动物香、肉桂、J 香等。香水香味通常具有甘甜、辛辣、性感、深邃、穿透力强、层次感丰富，香气持久等特点。'];
            recommendationTitle='东方调香水推荐';
            imageUrl='/static/image/东方调.webp';
            break;
            case 'meishi':
            xiangdiaoPattern = '%美食%';
            title = '美食调 Gourmand';
            description = ['1992穆勒天使Mugler Angel香水上市，开创性地使用了焦糖、巧克力、香草、蜂蜜,以及美味水果作为主要成分。这种创新的组合让美食调香水得到了公众的瞩目。',
            '随着美食调香水越来越流行，各大香水厂商开始竞相创作更多的"美食” 来取悦我们。爆米花、棉花糖、焦糖蛋糕、杏仁饼、果酱面包，只要是你吃过的,都有可能变成香水。',
        '美食调能抓住人的本能，也就人是对食物的欲望。人们吃东西时的味觉是由舌头和鼻子共同参与体验的。香甜可口的气味,能够直接作用于人的大脑,让人感到心情愉快。',
    '美食调给了我们一种全新的感官体验。女士们更容易接纳香甜的气味,所以,美食调香水多数是女香。'];
            recommendationTitle='美食调香水推荐';
            imageUrl='/static/image/美食调.webp';
            break;
    
        default:
            return res.status(404).send('Not Found'); // 如果没有匹配的type，返回404

        }

    try {
      const perfume=await per.findAll({
          where: {
              xiangdiao: {
                  [Op.like]: xiangdiaoPattern
              }
          }
      });
      // 传递检索到的香水数据到EJS模板进行渲染
      res.render('xiangdiao/guoxiang', {
        currentOdorType:TYPE,
          title: title,
          description: description,
          recommendationTitle:recommendationTitle,
          imageUrl: imageUrl,
          perfumes: perfume // 这里将数据库查询结果传递给EJS模板
      });
  } catch (error) {
      console.error("Fetching perfumes failed:", error);
      res.status(500).send("Server Error");
  }
  });

  module.exports = router;
