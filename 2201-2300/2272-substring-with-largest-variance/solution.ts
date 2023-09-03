function largestVariance(s: string): number {
  const n = s.length;
  let res = 0;
  const charCount = new Map<string, number>();

  for (const char of s) {
    const count = charCount.get(char);
    if (count) {
      charCount.set(char, count + 1);
    } else {
      charCount.set(char, 1);
    }
  }

  for (const major of charCount.keys()) {
    for (const minor of charCount.keys()) {
      if (major === minor) {
        continue;
      }

      let majorCount = 0;
      let minorCount = 0;
      let restMajorCount = charCount.get(major) as number;
      let restMinorCount = charCount.get(minor) as number;
      for (const char of s) {
        if (restMajorCount === 0 && restMinorCount === 0) {
          break;
        }
        if (char === major) {
          majorCount += 1;
          restMajorCount -= 1;
        }
        if (char === minor) {
          minorCount += 1;
          restMinorCount -= 1;
        }

        if (majorCount > 0 && minorCount > 0) {
          res = Math.max(majorCount - minorCount, res);
        }

        if (
          majorCount < minorCount &&
          restMinorCount > 0 &&
          restMajorCount > 0
        ) {
          majorCount = 0;
          minorCount = 0;
        }
      }
    }
  }

  return res;
}

const s =
  'lucmdweawziyvixyfesksmkxkbzzzqdmrmvdxeghlrlyteuhvumwppwltssrlboozoiudqegobjvnuinwoaaxbiqivtwabunqkzvjnczasvghsvrckpzelcqeloppxwmnbeocoiximllpvhahesjxznfphohoycaqsaghpoligtghoejodmhwuzjmpwkrpehheuubiespninbzfbqtiimtzbymdrxxbjzhqanmoocicqfhdrtfwjbxkgehjdqhmmjnrrgilsvyhonfmvywaejhxxgabogdqgttfiufrgpgpduwhzgmgoecwagwdvmnobiukuigphrkupqkeaphjsqhmetkgmcramydkosqqmayrdgfiokpanxznuknqpcqsbumyrxfsmmcxvherbjykpbwdzeqjgdhysauxflcdhkmlflmygylnxubaimtmsbbapfsrqdwwihubmemmhumzhmvalwkneehsxjofrcubyscgmlwfuzepmlyvpthqlvxrzcekmbemneozbtfajwkaizheoexbtdicgzmgnbytwyruexhigheujnolqafjmvtfgeduwtkisjovklsazfoslylmqjkgafbcfsawdjlyyobskeywidozxbmmapjrhqjjtoknpujwibccdotmnfxqcmhbelrireqfxmqoitciszlhecacxrpdbxeqravhrgwylhzpamvjjmghrzywpfpxjogidkkuolqscxuqgxzfmkuiagndjfhcmuwysojjmwtdrmicpnjpxonymsuwvrodwmfbtpwyxmesmkpuctrlabbknyoyueumfitkpdzsnkurzzyexeutmbqcdbmirqndghaksbpukszbkgvgswjrixuwvzsoymjuiungsnpytstwjbekzudtjxqkwkhgyophfllqvmdwvdlywtnsvlfwkesxdhdfwytgtwkgprlocjlcjqezcwpiwldnrqwyqxrgyyrkdotjhtsppwjkpecnpyarjftdbvzhdnqkqpbkwtkcfsomzwgxnwtsoslvxbwdkfvaeyxzkadctnngewqbwftphtfcdhjbwzytmrlolbgouoluyfyngtkijgwvxmjzqcapymvdssiirusnrnmuextfeosrdsudwixozufmwatfmjjumqmnprsqdrrerjkivjlnohkgckhuzbajvfjezbsivnhnexfryxghcxvetlwnjlutskdguwlsqhcuravxvfmzeycxifyjjqvbdmlmzfsuekrszqvdtmlfcytznjkplqpveqybkdmggrnyuoabxkepgbenzaufxwrmqufmnlgndjakvhbkkkzhgdoutdphnrqhtogbrpgdifgcqzheognwlgoqszqjsshaiciiwjqoxlznfgjtytrmkmypspmmsyencfxdjtzzlzgjzzoqwkzriqhvfqigezstcwcflbhyalipesdxddoyzcdskthyiasfdkgxgigirbixeaneynxedrbvfybpxxonssjylrahpkklrjgvbzllsfinxtcdkejynhxekkehqlizormtlmglsakfrketakpgsziogdgtfpwzeufejryluxjjuwfcgvbipmkrgtnfupqshysughfgnxtfgazdybvdtiqiimxibxlxhzsorqgshaauhgjszlfhaoxzfhnnfsdnsxqjmhaliuhavzqielpcqjzbzelrnruhqzxrynexubqpkhsoqrearfdxmliaiamfaorysjpuldzvuqnddmskegfmrxdgeonfhyuzhpgmghsvkvolhvrdyqvgqxshjjzrozkhkrsoktmvpkllizosqdsmybnwmybkyfqxyaeumgcubtdwtlbxuhcowgqvvrraazmeoamazjbljfzfvjmjhiifpskinydncsbcoefknvjzqinbfvgyyfjzqewxwdzivzeemqvxmjrsuxavjeqtbklezsqeas';

console.time();
const res = largestVariance(s);
console.timeEnd();

console.log(res);
