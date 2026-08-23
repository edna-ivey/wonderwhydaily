# Milestone 2 Batch 1 Review

Branch: codex/wwd-2-batch-1-voice-migration
Base milestone commit: 4a1d35c42c4f85b87b384ae4b9cc65f9aebf350e

Batch 1 migrated 10 published Wonders to canonical WWD 2.0 fields and voice. No commit has been made for Milestone 2.

## Verification

- npm run lint: passed
- npm run editorial:qa: passed, 0 errors and 0 warnings; existing future content backlog remains reported by QA.
- npm run build: passed
- Package scripts checked: no separate test script exists.
- Browser checks from initial Batch 1 pass: homepage, archive, desktop Wonder pages, mobile Wonder page, pre-reveal and post-reveal states checked.
- All 10 Batch 1 Wonders: before reveal, answer block, explanation, WAIT... WHAT?, and curiosity chain were not rendered; after reveal, all rendered.
- Homepage/archive cards use teasers for converted Wonders; unconverted Wonders still use the neutral migration fallback, not legacy answer summaries.

## Screenshots

- docs/screenshots/wwd-2-batch-1/archive-desktop.png
- docs/screenshots/wwd-2-batch-1/archive-mobile.png
- docs/screenshots/wwd-2-batch-1/homepage-desktop.png
- docs/screenshots/wwd-2-batch-1/homepage-mobile.png
- docs/screenshots/wwd-2-batch-1/why-are-astronauts-taller-in-space-after-desktop.png
- docs/screenshots/wwd-2-batch-1/why-are-astronauts-taller-in-space-before-desktop.png
- docs/screenshots/wwd-2-batch-1/why-do-bees-dance-after-mobile.png
- docs/screenshots/wwd-2-batch-1/why-do-bees-dance-before-mobile.png
- docs/screenshots/wwd-2-batch-1/why-do-flamingos-stand-on-one-leg-after-desktop.png
- docs/screenshots/wwd-2-batch-1/why-do-flamingos-stand-on-one-leg-before-desktop.png
- docs/screenshots/wwd-2-batch-1/why-does-wifi-get-slower-when-more-people-use-it-after-desktop.png
- docs/screenshots/wwd-2-batch-1/why-does-wifi-get-slower-when-more-people-use-it-before-desktop.png
- docs/screenshots/wwd-2-batch-1/why-is-the-sky-blue-after-desktop.png
- docs/screenshots/wwd-2-batch-1/why-is-the-sky-blue-before-desktop.png

## Cross-Wonder Voice Audit

- Revised teasers now expose the observable mystery without explaining the key clue.
- Repeated over-clever lines were reduced or removed: lawn ornament, free height upgrades, cartoon anvil, walking through peanut butter, apple plotting, tomato receipts, sky lighting decision, and river bend-more-bendy/Rude construction.
- Remaining repeated pattern to watch: several explanations still use contrast framing such as “not X.” It is accurate and natural in context, but Batch 2 should vary this.
- Humor density is lower after revision. Wi-Fi, yawning, and astronauts are now more explanation-led; flamingos/apples/tomatoes keep light warmth without pushing for a punchline.

## Review Package

### Why do flamingos stand on one leg?

**Old teaser/summary**

A flamingo's unusual joints let it balance with little effort, while tucking one leg may also help conserve heat.

**New teaser**

A flamingo has two perfectly usable legs. Then it tucks one away and stands there anyway. Why choose the one-leg version?

**Guess choices**

- The pose can be easier for their body than it looks
- It keeps one foot ready to step quickly if danger appears
- It helps them stay still while feeding in shallow water

**Correct answer**

The pose can be easier for their body than it looks

**Full explanation**

A flamingo standing on one leg looks like it should be hard work. If a human tried that for an afternoon, there would be wobbling, complaining, and probably a dramatic sit-down.

For flamingos, the pose can be surprisingly economical. Researchers have found that a flamingo's body can settle over one leg in a very stable position, using little active muscle force once everything lines up. The bird is not heroically clenching its way through the day. Its body is built to make the stance work.

That does not mean there is one perfect answer for every flamingo in every moment. Standing on one leg may help with rest, and tucking a bare leg close to the body may also reduce heat loss, especially when the bird is standing in water. Long skinny legs are excellent flamingo equipment, but they are also a lot of exposed surface.

The famous pose is probably a mix of comfort, energy-saving balance, and sometimes warmth. Science has not reduced it to one tidy slogan, which honestly makes the flamingo seem more reasonable, not less.

The mistake is judging the flamingo by human legs. Our bodies read the pose as a stunt. A flamingo's body seems to treat it more like a normal way to rest.

**WAIT... WHAT?**

The joint that looks like a flamingo's backward-bending knee is actually its ankle; the true knee is hidden higher beneath its feathers.

**Curiosity chain**

If standing on one leg can be restful, why do some birds tuck their heads when they sleep?

Unlinked future-Wonder idea

**Sources**

- Royal Society Biology Letters: https://royalsocietypublishing.org/rsbl/article/13/5/20160948/62549/Mechanical-evidence-that-flamingos-can-support
- Emory University: https://news.emory.edu/stories/2017/05/flamingo-research-shows-birds-use-one-legged-stance-relax

### Why are astronauts taller in space?

**Old teaser/summary**

Without Earth's gravity compressing the spine, the cushions between an astronaut's vertebrae expand.

**New teaser**

Astronauts can actually get taller while they're in space. Not forever, but enough to measure. How does leaving Earth change their height?

**Guess choices**

- Their spine lengthens in microgravity
- Their leg bones spread slightly as body fluids shift
- Daily exercise stretches their muscles more than on Earth

**Correct answer**

Their spine lengthens in microgravity

**Full explanation**

An astronaut can leave Earth at one height and measure taller in orbit. Not a little "I stood up straighter today" taller. Sometimes several centimeters taller.

The reason starts with the spine. Your backbone is a stack of bones called vertebrae, with soft discs between them and natural curves through the whole structure. On Earth, gravity is always loading that stack. It is quietly pressing downward every day.

In microgravity, the spine is unloaded. Without body weight pressing through it in the usual way, the spine can lengthen. NASA has described the discs between the vertebrae filling with more fluid and the spine stretching; researchers are still studying exactly how discs, muscles, and spinal curves all contribute during long missions.

The extra height is temporary, and it is not exactly a perk. Astronauts can have back discomfort in space, and coming home means the body has to readjust to gravity. Microgravity also affects muscles and bones, which is why astronauts spend so much time exercising in orbit.

After returning to Earth, gravity gets involved again. The borrowed height fades as the spine settles back toward its normal loaded shape.

Your height is not quite as fixed as it feels. It is partly a deal your flexible body makes with the planet under your feet.

**WAIT... WHAT?**

NASA says astronauts on long space station missions can grow up to about 3 percent taller in orbit, then shrink back toward their usual height after they return to Earth.

**Curiosity chain**

If astronauts float in space, are they truly weightless?

Links to existing Wonder: why-do-astronauts-float

**Sources**

- NASA spinal ultrasound investigation: https://www.nasa.gov/image-article/astronauts-perform-spinal-ultrasound-investigation/
- NASA human body in space: https://www.nasa.gov/humans-in-space/the-human-body-in-space/

### Why do we yawn?

**Old teaser/summary**

Yawns arrive when we are tired, bored, waking up, and sometimes just watching someone else yawn.

**New teaser**

Your mouth opens. Your eyes squeeze shut. You take one enormous breath, usually without deciding to do any of it. Why does your body suddenly need to yawn?

**Guess choices**

- It may help your brain shift states and manage temperature
- It is mostly a warning that your blood oxygen is low
- It stretches your lungs so they do not stiffen overnight

**Correct answer**

It may help your brain shift states and manage temperature

**Full explanation**

Yawning looks simple: open mouth, inhale, maybe make an awkward face, move on. The science is not nearly that tidy.

One old idea said yawning happens because you need more oxygen. That sounds sensible, but experiments have not supported it well. People yawn when they are tired, waking up, bored, stressed, or shifting attention, which points to something more like a state-change signal.

One leading possibility is thermoregulation, which means temperature control. Your brain works best in a narrow temperature range, and yawning may help nudge that system by changing blood flow, stretching facial muscles, and drawing in air. Some studies have found that cooling the face or nose can reduce contagious yawning.

But yawning is still not fully solved. It may help with alertness, brain temperature, and transitions between different body states. The honest answer is that scientists have strong clues, not a single final explanation.

Then there is contagious yawning. Seeing, hearing, reading about, or sometimes even thinking about yawns can trigger one. That does not mean your brain is broken. It means your body can copy a cue before you consciously vote on it.

A yawn is familiar enough to ignore and mysterious enough to study.

**WAIT... WHAT?**

Yawning is contagious in several social animals, including chimpanzees and some dogs.

**Curiosity chain**

Why is yawning contagious?

Unlinked future-Wonder idea

**Sources**

- NIH/PMC thermoregulatory theory review: https://pmc.ncbi.nlm.nih.gov/articles/PMC3534187/
- NIH/PMC physiological significance review: https://pmc.ncbi.nlm.nih.gov/articles/PMC3678674/

### Why do rivers curve?

**Old teaser/summary**

Even on fairly flat ground, flowing water rarely keeps a perfectly straight path.

**New teaser**

A river has somewhere to go. Why does it waste all that distance bending back and forth instead of taking the straightest path?

**Guess choices**

- Tiny bends grow as water erodes one bank and drops mud on the other
- Earth's rotation nudges rivers left and right until they snake
- Fish paths slowly carve the river into sweeping turns

**Correct answer**

Tiny bends grow as water erodes one bank and drops mud on the other

**Full explanation**

A river has somewhere to go, yet it rarely behaves like it is late. Give it flat ground, and it still starts wandering.

The first bend can begin with something small: uneven ground, a patch of softer soil, a fallen branch, a little wobble in the flow. Once water curves, the outside of the bend usually moves faster and hits the bank harder. That erodes the outer bank. The inside of the bend is calmer, so mud and sand can settle there.

Now the river has created a problem for itself. Erosion on the outside and deposition on the inside make the bend stronger, which makes the flow curve even more, which keeps the editing going. A tiny wiggle becomes a meander.

The water also spirals through the curve, helping carry loosened material away from one side and drop it on the other. Over time, the whole bend can migrate across the floodplain. A river channel is not just a line on a map. It is a moving argument between water, sediment, and land.

Sometimes a loop grows so wide that the river cuts across its narrow neck during a flood. The abandoned curve can become an oxbow lake.

A river curve is not random decoration. It is a feedback loop you can see from space.

**WAIT... WHAT?**

A looping river bend can eventually get cut off from the main channel and become an oxbow lake, leaving behind a crescent-shaped reminder of where the river used to go.

**Curiosity chain**

If a river can abandon one of its own bends, what happens to the cut-off loop?

Unlinked future-Wonder idea

**Sources**

- USGS EROS oxbow lakes: https://eros.usgs.gov/earthshots/oxbow-lakes
- National Geographic Education oxbow lake: https://education.nationalgeographic.org/resource/oxbow-lake/

### Why does Wi-Fi get slower when more people use it?

**Old teaser/summary**

Devices sharing one Wi-Fi connection must take turns using limited radio airtime and internet capacity.

**New teaser**

One person gets online and everything is fine. Add a video call, a game, three phones, and a streaming TV, and suddenly everybody is asking, "Why is the Wi-Fi so slow?"

**Guess choices**

- Devices have to wait for chances to talk to the router
- The router splits its signal strength evenly among every device
- The router lowers its speed to keep from overheating

**Correct answer**

Devices have to wait for chances to talk to the router

**Full explanation**

Wi-Fi feels like one invisible thing, but your devices are not all talking at once. They are sharing radio airtime.

Your phone, laptop, game console, and TV use radio waves to communicate with the router. When several devices use the same Wi-Fi resources, each one needs opportunities to send and receive data. A video call needs lots of steady chances. A streaming TV keeps asking for more. A game may need quick back-and-forth messages. More active devices means more waiting.

Wi-Fi also has to deal with messy real life. Signals can interfere with each other, bounce around, or arrive weakly. When data does not get through cleanly, it may need to be sent again. That retry takes more time.

Distance matters too. A device far from the router may talk more slowly, so it can use more airtime to send the same amount of information. Everyone else waits while that slower conversation finishes.

Then there is the internet connection beyond the router. Even if your Wi-Fi is doing its job, the whole house may still be sharing one limited connection from the internet provider.

When a crowded network slows down, the router has not lost interest. Too many devices are trying to use the same invisible speaking time.

**WAIT... WHAT?**

Wi-Fi is designed to be polite: before a device talks, it listens to see whether the air is already busy. Your router is managing an invisible etiquette system.

**Curiosity chain**

If Wi-Fi is just radio, why do walls make it weaker?

Links to existing Wonder: why-does-wifi-get-weaker-through-walls

**Sources**

- ANSI/IEEE 802.11 collision avoidance explainer: https://blog.ansi.org/ansi/ieee-802-11-collision-avoidance-wireless-networks/
- IEEE Standards Wi-Fi evolution: https://standards.ieee.org/beyond-standards/the-evolution-of-wi-fi-technology-and-standards/

### Why do apples turn brown?

**Old teaser/summary**

Cutting an apple starts a chemical reaction that its intact skin had kept apart.

**New teaser**

You slice an apple. You look away for a bit. The pale inside starts turning brown. Nothing looks broken, exactly, but the apple has definitely changed.

**Guess choices**

- Oxygen starts an enzyme reaction in the cut cells
- Sugar dries into a darker layer on the exposed surface
- Tiny microbes immediately begin digesting the fruit

**Correct answer**

Oxygen starts an enzyme reaction in the cut cells

**Full explanation**

Slice an apple and you have opened thousands of tiny rooms at once.

Inside the apple's cells are plant compounds and an enzyme called polyphenol oxidase. While the apple is whole, the skin and cell walls help keep the inside protected. Cutting or bruising breaks cells open, and oxygen from the air suddenly gets an invitation.

That enzyme helps oxygen react with the plant compounds. The reaction creates new molecules that link up into brown pigments on the exposed surface. The apple is not instantly rotting, and the brown is not dirt. It is chemistry becoming visible.

The same process is called enzymatic browning. Enzymatic just means an enzyme is helping the reaction happen. It shows up in apples, bananas, potatoes, avocados, and plenty of other foods that seem to change their minds once you cut them.

Lemon juice can slow the browning because acid changes the conditions the enzyme likes, and vitamin C can react with oxygen-related compounds before they help make brown pigments. Cold temperatures slow the reaction too.

The apple did not go bad in five minutes. It just stopped keeping its inner chemistry private after you sliced it.

**WAIT... WHAT?**

Lemon juice slows browning because its acidity and vitamin C interfere with the reaction, so it is not just making the apple taste fancy.

**Curiosity chain**

Why does lemon juice keep cut fruit looking fresh?

Unlinked future-Wonder idea

**Sources**

- NIH/PMC enzymatic browning review: https://pmc.ncbi.nlm.nih.gov/articles/PMC7355983/
- Scientific American activity explanation: https://www.scientificamerican.com/article/fruits-gone-bad-discover-enzymatic-browning/

### Why did people think tomatoes were poisonous?

**Old teaser/summary**

Tomatoes looked like poisonous nightshades, so many Europeans admired the unfamiliar plants before trusting them as food.

**New teaser**

Today we put tomatoes on everything. A few centuries ago, plenty of Europeans looked at them and thought, "Absolutely not." How did a perfectly edible fruit get such a terrible reputation?

**Guess choices**

- The unfamiliar fruit looked related to poisonous nightshade plants
- Its red color made people think it had absorbed blood from the soil
- Tomato vines were known to poison nearby wells

**Correct answer**

The unfamiliar fruit looked related to poisonous nightshade plants

**Full explanation**

For many people today, a tomato is about as threatening as a sandwich. In Europe a few centuries ago, it could look more like a beautiful red warning sign.

Tomatoes came from the Americas, where people had already been growing and eating them. When Europeans encountered them, the plant was unfamiliar and belonged to the nightshade family. That family includes delicious foods like potatoes and eggplants, but also genuinely poisonous plants. If you already know some nightshades can hurt you, a new red fruit from the same general crowd is going to get judged.

The suspicion was not helped by the plant itself. Tomato leaves and stems contain toxic compounds and should not be eaten. The ripe fruit is safe, but that distinction is easier to trust once a food is familiar.

In parts of Europe, tomatoes were grown as ornamental curiosities before they became everyday ingredients. People could admire the plant without inviting it to dinner. Attitudes also varied by place; this was not one giant continent-wide tomato panic button.

Over time, cooks used tomatoes more, people saw that the ripe fruit was not poisoning everyone, and suspicion softened into sauce.

The tomato's story is a reminder that unfamiliar food can look dangerous long before anyone understands it.

**WAIT... WHAT?**

Tomato leaves and stems do contain toxic compounds, even though the ripe fruit is safe to eat. The suspicious people were wrong about the snack, but not totally crazy about the plant.

**Curiosity chain**

If tomatoes are fruit, why do we treat them like vegetables?

Unlinked future-Wonder idea

**Sources**

- Smithsonian Magazine tomato history: https://www.smithsonianmag.com/history/how-the-misrepresentation-of-tomatoes-as-stinking-poison-apples-that-provoked-vomiting-made-people-afraid-of-them-for-more-than-200-years-863735/

### Why do mirrors reverse left and right but not up and down?

**Old teaser/summary**

A mirror does not secretly choose left and right. It flips a different direction entirely.

**New teaser**

Raise your right hand in a mirror. The person in the glass raises the hand on the opposite side. Why does the mirror seem to mess with left and right but leave up and down alone?

**Guess choices**

- Mirrors flip front-to-back, and our brains compare that as left-right
- Our two eyes force reflections to swap horizontal sides
- Gravity keeps reflections upright but lets sideways directions reverse

**Correct answer**

Mirrors flip front-to-back, and our brains compare that as left-right

**Full explanation**

Mirrors have been accused of swapping left and right for centuries. The strange truth is that they never agreed to that job.

A flat mirror reverses the direction pointing toward and away from its surface. Your nose points toward the mirror; your reflection's nose points back toward you. That is a front-to-back flip, not a left-to-right flip.

Why does your right hand look like it is on the reflection's left side? Because your brain imagines the reflection as another person facing you. To become that person, you mentally rotate yourself around. That imaginary turn is where left and right get tangled.

Try pointing upward in a mirror. The reflection points upward too. Point left, and the reflected hand is still on the left side of the glass from your point of view. But point toward the mirror, and the reflection points back. That is the flipped direction.

Writing looks backward for the same reason. The front of the letters has been turned toward the mirror, so depth has flipped. We describe the result as left-right reversal because that is how it feels when we try to read it.

The mirror is consistent. Your brain is the one doing theatrical comparisons with the person in the glass.

**WAIT... WHAT?**

If you print a word on a clear sheet and turn the ink toward a mirror, the reflection looks readable. The "backward writing" problem is really a front-and-back problem wearing a left-and-right disguise.

**Curiosity chain**

Why does writing look backward in a mirror?

Unlinked future-Wonder idea

**Sources**

- Exploratorium mirror reversal activity: https://www.exploratorium.edu/snacks/mirror-reversal
- West Texas A&M physics explainer: https://wtamu.edu/~cbaird/sq/2013/01/05/why-do-mirrors-flip-left-to-right-and-not-up-to-down/

### Why do bees dance?

**Old teaser/summary**

A honeybee can return home and give the colony directions without drawing a map.

**New teaser**

A bee comes back to the hive and starts wiggling, turning, and running in a strange little pattern. The other bees pay very close attention. What is she doing?

**Guess choices**

- She is showing other bees how to find food
- She is shaking pollen loose so workers can collect it
- She is warning the hive that danger is nearby

**Correct answer**

She is showing other bees how to find food

**Full explanation**

A honeybee can find a brilliant patch of flowers, fly home, and tell the colony where dinner is without drawing a map or saying a word.

The famous move is called the waggle dance. A forager bee runs in a short straight line while wiggling her body, then loops back and repeats the pattern. The angle of that waggle run tells other bees which direction to fly compared with the Sun. The length of the waggle gives clues about distance.

This happens inside a hive, which is crowded and dark. The audience is not sitting politely in rows, watching a stage show. Nearby bees follow the dancer closely, feeling movements and vibrations with their bodies and antennae. They also pick up scent from the flowers the forager visited.

The dance is not a perfect GPS pin. It is more like a set of directions plus helpful clues: go this way, for about this far, toward flowers that smell like this.

That is still astonishing. One bee does not have to personally lead everyone back. She can turn her trip into instructions, and the colony can use those instructions to send more workers toward the same good place.

The hive is full of tiny bodies, but the dance turns it into shared knowledge.

**WAIT... WHAT?**

Bees can use the Sun as a compass, and they can keep adjusting the dance's direction as the Sun moves across the sky.

**Curiosity chain**

If bees use the Sun as a compass, how do they navigate when it is cloudy?

Unlinked future-Wonder idea

**Sources**

- NC State Extension honey bee dance language: https://content.ces.ncsu.edu/honey-bee-dance-language
- UC San Diego bee dance communication: https://today.ucsd.edu/story/bee-dancing-is-better-with-the-right-audience

### Why is the sky blue?

**Old teaser/summary**

Sunlight looks white, so how does the enormous air above us turn it into blue?

**New teaser**

Sunlight looks white. Air looks clear. So where is all that blue coming from?

**Guess choices**

- Tiny air molecules scatter blue light more strongly
- The ocean reflects blue light onto the air above it
- Blue light is the only color that can pass through clouds

**Correct answer**

Tiny air molecules scatter blue light more strongly

**Full explanation**

The air above you looks empty. Sunlight looks white. Put those two things together and you should get a clear-looking sky, right?

Instead, the whole ceiling of the day is blue.

Sunlight is made of many colors traveling together. When it enters Earth's atmosphere, it meets tiny molecules of gas. Those molecules scatter shorter wavelengths of light much more strongly than longer wavelengths. Blue light has a shorter wavelength than red light, so it gets redirected all over the sky.

That scattered blue light reaches your eyes from every direction. You are not looking at a blue shell around Earth, and the sky is not mainly reflecting the ocean. You are seeing sunlight that got bounced sideways by countless invisible molecules before it reached you.

This scattering is called Rayleigh scattering, named for the scientist who helped explain it. The name sounds formal, but the idea is beautifully simple: tiny particles are much better at tossing around shorter waves of light.

Near sunset, sunlight travels through more atmosphere before it reaches you. Much of the blue light scatters out of the direct path, leaving more reds and oranges to stream through.

The same air can make noon blue and evening fiery. It depends on the route the sunlight took.

**WAIT... WHAT?**

Violet light scatters even more than blue, but our eyes are less sensitive to violet and sunlight has less violet in it. That helps explain why the sky looks blue instead of purple.

**Curiosity chain**

If blue light scatters so much, why do sunsets look red and orange?

Unlinked future-Wonder idea

**Sources**

- NASA Space Place: https://spaceplace.nasa.gov/blue-sky/
- NOAA NESDIS: https://www.nesdis.noaa.gov/about/k-12-education/atmosphere/why-the-sky-blue
