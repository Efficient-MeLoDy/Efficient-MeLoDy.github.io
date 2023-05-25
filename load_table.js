function createAudioHTML(path, flat) {
  if (flat) {
    return '<audio controls controlslist="nodownload" class="px-1" style="width: 36vw;"> <source src=' +
        path +
        ' type="audio/wav">Your browser does not support the audio element.</audio>';
  }
  return '<audio controls controlslist="nodownload" class="px-1"> <source src=' +
      path +
      ' type="audio/wav">Your browser does not support the audio element.</audio>';
}


function generateTextPromptTable(tableId, prompt, page) {
  let table = document.getElementById(tableId);
  let nrRows = table.rows.length;
  for (let i = 1; i < nrRows; i++) {
    table.deleteRow(1);
  }
  const prefix = 'wavs/diverse_text_prompt/';
  const end_idx = 2;
  const example = [
    '10 seconds',
    'Continue to 20 seconds',
  ];
  for (let i = 0; i < 2; i++) {
    let row = table.insertRow(i % 2 + 1);
    row.style.height = '120px';
    let cell = row.insertCell(0);
    cell.innerHTML = example[i];
    cell.style.textAlign = "center";

    cell = row.insertCell(1);
    cell.innerHTML = createAudioHTML(prefix + prompt + '_' + (i+1).toString() + '0s_' + page.toString() + '.wav', true);
    cell.style.textAlign = "center";
    
  }
}


function generateMusicPromptTable(tableId, prompt, page) {
  let table = document.getElementById(tableId);
  let nrRows = table.rows.length;
  for (let i = 1; i < nrRows; i++) {
    table.deleteRow(1);
  }
  const prefix = 'wavs/diverse_music_prompt/';
  const end_idx = 2;
  const example = [
    '10 seconds',
    'Continue to 20 seconds',
  ];
  for (let i = 0; i < 2; i++) {
    let row = table.insertRow(i % 2 + 1);
    row.style.height = '120px';
    let cell = row.insertCell(0);
    cell.innerHTML = example[i];
    cell.style.textAlign = "center";

    cell = row.insertCell(1);
    cell.innerHTML = createAudioHTML(prefix + prompt + '_' + (i+1).toString() + '0s_' + page.toString() + '.wav', true);
    cell.style.textAlign = "center";
    
  }
}

function generateAblationAngleScheduleTable(tableId, page) {
  let table = document.getElementById(tableId);
  let nrRows = table.rows.length;
  for (let i = 1; i < nrRows; i++) {
    table.deleteRow(1);
  }
  const prefix = 'wavs/ablation_angle_schedules/';
  const end_idx = 3;
  const prompts = [
    'acoustic guitar',
    'flute',
    'saxophone',
  ];
  const pages_name = [
    '10steps',
    '20steps',
  ];

  for (let i = 0; i < 3; i++) {
    let row = table.insertRow(i % 3 + 1);
    row.style.height = '120px';
    let cell = row.insertCell(0);
    cell.innerHTML = prompts[i];
    cell.style.textAlign = "center";

    cell = row.insertCell(1);
    cell.innerHTML = createAudioHTML(prefix + prompts[i].replaceAll(' ', '_') + '_uniform_' + pages_name[page-1] + '.wav', false);
    cell.style.textAlign = "center";

    cell = row.insertCell(2);
    cell.innerHTML = createAudioHTML(prefix + prompts[i].replaceAll(' ', '_') + '_linear_' + pages_name[page-1] + '.wav', false);
    cell.style.textAlign = "center";
    
  }
}

function generateShortFormTable(tableId, filenames, page) {
  let numPerPage = 4;
  let table = document.getElementById(tableId + '-generation');
  let nrRows = table.rows.length;
  for (let i = 1; i < nrRows; i++) {
    table.deleteRow(1);
  }
  const prefix = 'wavs/prompts_from_musiclm/' + tableId + '/';
  const end_idx = page * numPerPage;
  for (let i = (page - 1) * numPerPage; i < end_idx; i++) {
    let row = table.insertRow(i % numPerPage + 1);
    row.style.height = '80px';
    if (i < filenames.length) {
      let cell = row.insertCell(0);
      cell.innerHTML = filenames[i].replaceAll('-', ' ');
      cell.style.textAlign = "center";

      cell = row.insertCell(1);
      cell.innerHTML = createAudioHTML(prefix + filenames[i] + '-MusicLM.wav', false);
      cell.style.textAlign = "center";

      cell = row.insertCell(2);
      cell.innerHTML = createAudioHTML(prefix + filenames[i] + '-10s.wav', false);
      cell.style.textAlign = "center";

      cell = row.insertCell(3);
      cell.innerHTML = createAudioHTML(prefix + filenames[i] + '-20s.wav', false);
      cell.style.textAlign = "center";
    } else {
      let cell = row.insertCell(0);
      cell.innerHTML = '<br>';
      cell = row.insertCell(1);
      cell.innerHTML = '<br>';
      cell.style.textAlign = "center";
      cell = row.insertCell(2);
      cell.innerHTML = '<br>';
      cell.style.textAlign = "center";
      cell = row.insertCell(3);
      cell.innerHTML = '<br>';
      cell.style.textAlign = "center";
    }
  }
}

function generateLongFormTable(tableId, baseline, folder, filenames, text_prompts, page) {
  let table = document.getElementById(tableId);
  let nrRows = table.rows.length;
  for (let i = 1; i < nrRows; i++) {
    table.deleteRow(1);
  }
  if (baseline == 'musiclm'){
    numLongMusicPerPage = 4;
    baseline_name = 'MusicLM';
  }
  else if (baseline == 'noise2music'){
    numLongMusicPerPage = 5;
    baseline_name = 'Noise2Music';
  }
  const prefix = 'wavs/prompts_from_' + baseline + '/' + folder + '/';
  const end_idx = page * numLongMusicPerPage;
  for (let i = (page - 1) * numLongMusicPerPage; i < end_idx; i++) {
    let row = table.insertRow(i % numLongMusicPerPage + 1);
    row.style.height = '120px';
    if (i < filenames.length) {
      let cell = row.insertCell(0);
      cell.innerHTML = text_prompts[i];
      cell.style.textAlign = "center";

      cell = row.insertCell(1);
      cell.innerHTML = createAudioHTML(prefix + filenames[i] + '-' + baseline_name + '.wav', false);
      cell.style.textAlign = "center";
      cell = row.insertCell(2);
      cell.innerHTML = createAudioHTML(prefix + filenames[i] + '-MeLoDy-30s.wav', false);
      cell.style.textAlign = "center";
      cell = row.insertCell(3);
      cell.innerHTML = createAudioHTML(prefix + filenames[i] + '-MeLoDy-1m.wav', false);
      cell.style.textAlign = "center";
    } else {
      let cell = row.insertCell(0);
      cell.innerHTML = '<br>';
      cell = row.insertCell(1);
      cell.innerHTML = '<br>';
      cell.style.textAlign = "center";
      cell = row.insertCell(2);
      cell.innerHTML = '<br>';
      cell.style.textAlign = "center";
      cell = row.insertCell(3);
      cell.innerHTML = '<br>';
      cell.style.textAlign = "center";
    }
  }
}


accordion = [
  'accordion-death-metal',
  'accordion-edm',
  'accordion-piano',
  'accordion-rock',
  'accordion-techno',
]

epochs = [
  'club-in-the-50s',
  'club-in-the-60s',
  'club-in-the-70s',
  'club-in-the-80s',
  'club-in-the-90s',
  'club-in-the-00s',
  'futuristic-club',
]

experience = [
  'beginner-piano-player',
  'intermediate-piano-player',
  'professional-piano-player',
  'crazy-fast-professional-piano-player',
  'beginner-guitar-player',
  'intermediate-guitar-player',
  'professional-guitar-player',
]

genres = [
  '8-bit',
  'ambient',
  'berlin-90s-house',
  'big-beat',
  'blues',
  'breakbeat',
  'british-indie-rock',
  'chillout',
  'country',
  'detroit-techno',
  'downtempo',
  'dream-pop',
  'drum-n-bass',
  'east-coast-hip-hop',
  'folk',
  'funky-jazz',
  'grunge',
  'hip-hop',
  'indie-folk-hip-hop',
  'jazz',
  'minimal-house',
  'peruvian-punk',
  'reggae',
  'rock',
  'trap-hip-hop',
  'west-coast-hip-hop',
]

instruments = [
  'acoustic-guitar',
  'cello',
  'electric-guitar',
  'flute',
  'grand-piano',
  'harp',
  'mandolin',
  'maracas',
  'oboe',
  'saxophone',
  'trumpet',
  'ukulele',
  'violin',
  'xylophone',
]

places = [
  'beach-in-the-caribbeans',
  'escaping-prison',
  'gym',
  'street-performance',
  'underground-rave',
]

musiclm_rich_captions = [
  'arcade',
  'electreggaeton',
  'synth',
  'funky',
  'meditation',
  'techno-strings',
];

musiclm_rich_captions_text_prompts = [
  'The main soundtrack of an arcade game. It is fast-paced and upbeat, with a catchy electric guitar riff. The music is repetitive and easy to remember, but with unexpected sounds, like cymbal crashes or drum rolls.',
  'A fusion of reggaeton and electronic dance music, with a spacey, otherworldly sound. Induces the experience of being lost in space, and the music would be designed to evoke a sense of wonder and awe, while being danceable.',
  'A rising synth is playing an arpeggio with a lot of reverb. It is backed by pads, sub bass line and soft drums. This song is full of synth sounds creating a soothing and adventurous atmosphere. It may be playing at a festival during two songs for a buildup.',
  'Funky piece with a strong, danceable beat and a prominent bassline. A catchy melody from a keyboard adds a layer of richness and complexity to the song.',
  'Meditative song, calming and soothing, with flutes and guitars. The music is slow, with a focus on creating a sense of peace and tranquility.',
  'Industrial techno sounds, repetitive, hypnotic rhythms. Strings playing a repetitive melody creates an eerie, unsettling atmosphere. The music is hypnotic and trance-like, and it is easy to get lost in the rhythm. The strings high-pitched notes pierce through the darkness, adding a layer of tension and suspense.',
];

noise2music_rich_captions = [
  'powerful',
  'bright',
  'moody',
  'modern',
  'classical',
  'electronic',
  'a-fast',
  'middle',
  'this-is-music',
];

noise2music_rich_captions_text_prompts = [
  'Powerful tune with pop, rock influence with strong synthesizers for an introduction music to a sporting event.',
  'Bright, cheerful and groovy song featuring the piano that sounds like an opening theme for a comedy series.',
  'Moody jazz music with a basic formation (drums, contra bass, piano and trumpet) with a melancholy trumpet solo.',
  'Modern fusion instrumental music influenced by traditional Chinese music with a wistful tone.',
  'Classical music with horns and trumpets that can be used as an entrance song for a ceremony.',
  'Electronic dance music with chill vibes featuring water sounds and violin.',
  'A fast, complicated, technical song with clear sound production value that sounds like music from a video game boss battle.',
  'Middle eastern instrumental music for meditation, with the flute taking a lead role in the arrangement.',
  'This is music that would be played at the climax of a movie. Dramatic, stirring orchestral music is amplifying the emotion of the scene.',
];

noise2music_musical_attributes = [
  'genre-standard-jazz',
  'genre-fusion-jazz',
  'genre-blues',
  'genre-classical',
  'genre-edm',
  'instrument-piano',
  'instrument-saxophone',
  'instrument-orchestra',
  'instrument-pianist',
  'instrument-guitarist',
  'tempo-slow-rock',
  'tempo-rapid-rock',
  'tempo-fast-edm',
  'tempo-upbeat-edm',
  'tempo-slow-edm',
  'mood-uplifting',
  'mood-suspenseful',
];

noise2music_musical_attributes_text_prompts = [
  'Moody, melancholy medium-tempo <b><i>standard jazz</i></b> song that is good for late-night listening.',
  'Moody, melancholy medium-tempo <b><i>fusion jazz</i></b> song that is good for late-night listening.',
  'Moody, melancholy medium-tempo <b><i>blues</i></b> that is good for late-night listening.',
  '<b><i>Orchestral classical</i></b> music to listen to while focusing on homework.',
  '<b><i>EDM</i></b> music to listen to while focusing on homework.',
  'A romantic love song played by a band with a lead <b><i>piano</i></b>.',
  'A romantic love song played by a band with a lead <b><i>saxophone</i></b>.',
  'A sad song played by a <b><i>symphony orchestra</i></b>.',
  'A sad song played by a <b><i>solo pianist</i></b>.',
  'A sad song played by a <b><i>solo acoustic guitarist</i></b>.',
  '<b><i>Slow-paced</i></b> progressive rock instrumental video game music with electric guitars, keyboards, bass and drums.',
  '<b><i>Rapidly-paced</i></b> progressive rock instrumental video game music with electric guitars, keyboards, bass and drums.',
  '<b><i>Fast</i></b> electronic dance music with a cool and chic vibe.',
  '<b><i>Up-beat</i></b> electronic dance music with a cool and chic vibe.',
  '<b><i>Slow</i></b> dance music with a cool and chic vibe.',
  '<b><i>Uplifting</i></b> orchestral music.',
  '<b><i>Suspenseful</i></b> orchestral music.',
];

noise2music_musiccaps = [
  'this-is-a-psychedelic',
  'this-audio',
  'the-sampled-drums',
  'the-trumpets',
  'it-is-captivating',
  'a-darbuka',
  'the-drums',
  'there-is-a-string',
  'there-is-a-fuzzy',
  'it-sounds-energetic',
  'the-music-is',
  'theres-a-crunchy',
  'there-is-a-simple',
  'this-is-an-electronic',
  'this-piece',
];

noise2music_musiccaps_text_prompts = [
  'This is a psychedelic rock music piece. It could also be playing in the background at a hippie coffee shop.',
  'This audio contains acoustic drums playing a groove with a lot of cymbal hits.',
  'The sampled drums go for a usual hip-hop beat, nothing standing out and together with the sub-woofer bass drive the pulse of the music.',
  'The trumpets play a blaring descant, and other trumpets play a percussive harmonic layer long with a tuba playing the lower register.',
  'It is captivating, intense, mellifluous, engaging,and fervent. This music is an enthralling Sitar instrumental.',
  'A darbuka plays a simple beat. A variety of middle-eastern percussion instruments are played in the background.',
  'The drums feature a light accompaniment, the piano has small interventions here and there. The jazz organ plays in low volume somewhere in the background. The atmosphere is like a dim light in a bar late at night before closing hours when everybody has left home.',
  'There is a string orchestra playing an ominous tune that is full of suspense. This piece could be used in the soundtrack of a horror movie, especially during the scenes where a character is walking through a dangerous zone.',
  'There is a fuzzy synth bass playing a groovy bass line with a mellow sounding keyboard playing alongside it. There is a loud electronic drum beat in the rhythmic background.',
  'It sounds energetic and like something you would hear in clubs.',
  'The music is youthful, groovy, pulsating, electrifying, buoyant, thumping, psychedelic, trance like and trippy.',
  'There\'s a crunchy and funky electric guitar being used to play chords in a funky rhythm. The song is a dance-pop song with elements of funk, disco and pop rock. The bassline is groovy and upbeat and the drumming is also centred around eighth notes and a disco groove.',
  'There is a simple tune being played on a ukulele. The atmosphere of the piece is easygoing. This piece could be used in the background of wholesome social media content.',
  'This is an electronic/downtempo house music piece.',
  'This piece could be used in the soundtrack of a drama movie during a scene of serenity or mourning. There is no singer.',
];

generateShortFormTable('accordion'  , accordion  , 1);
generateShortFormTable('epochs'     , epochs	   , 1);
generateShortFormTable('experience' , experience , 1);
generateShortFormTable('genres'     , genres	   , 1);
generateShortFormTable('places'     , places	   , 1);
generateShortFormTable('instruments', instruments, 1);
generateLongFormTable('rich-captions', 'musiclm', 'rich-descriptions', musiclm_rich_captions, musiclm_rich_captions_text_prompts, 1);
generateLongFormTable('n2m-rich-captions', 'noise2music', 'rich-descriptions', noise2music_rich_captions, noise2music_rich_captions_text_prompts, 1);
generateLongFormTable('n2m-musical-attributes', 'noise2music', 'musical-attributes', noise2music_musical_attributes, noise2music_musical_attributes_text_prompts, 1);
generateLongFormTable('n2m-musiccaps', 'noise2music', 'musiccaps', noise2music_musiccaps, noise2music_musiccaps_text_prompts, 1);
generateTextPromptTable('melody-time-lapse', 'give_me_a_background_music_track', 1);
generateTextPromptTable('melody-coffee-time', 'give_me_a_piece_of_music', 1);
generateMusicPromptTable('Y9hCnEfZFZ04', 'Y9hCnEfZFZ04', 1);
generateMusicPromptTable('YacEHGV7Gq6U', 'YacEHGV7Gq6U', 1);
generateMusicPromptTable('YFYFapDVOFHg', 'YFYFapDVOFHg', 1);
generateMusicPromptTable('YMHHshnnqyco', 'YMHHshnnqyco', 1);
generateAblationAngleScheduleTable('ablation-angle-schedules', 1)


$(document).ready(function() {

  const sections_short_form = ['accordion', 'epochs', 'experience', 'places'];
  const filenames_short_form = [accordion, epochs, experience, places];
  for (let isection = 0; isection <= 5; isection++) {
    let section_name = sections_short_form[isection];
    let filenames = filenames_short_form[isection];
    for (let i = 1; i <= 2; i++) {
      let id = '#' + section_name + '-generation-' + i;
      $(id).click(function() {
        generateShortFormTable(section_name, filenames, i);
        $(id).parent().siblings().removeClass('active');
        $(id).parent().addClass('active');
        return false;
      });
    }
  }

  for (let i = 1; i <= 7; i++) {
    let id = '#genres-generation-' + i;
    $(id).click(function() {
      generateShortFormTable(
          'genres',
          genres, i);
      $(id).parent().siblings().removeClass('active');
      $(id).parent().addClass('active');
      return false;
    });
  }

  for (let i = 1; i <= 4; i++) {
    let id = '#instruments-generation-' + i;
    $(id).click(function() {
      generateShortFormTable(
          'instruments',
          instruments, i);
      $(id).parent().siblings().removeClass('active');
      $(id).parent().addClass('active');
      return false;
    });
  }
  
  for (let i = 1; i <= 2; i++) {
   let id = '#rich-captions-' + i;
   $(id).click(function() {
     generateLongFormTable('rich-captions', 'musiclm', 'rich-descriptions', musiclm_rich_captions, musiclm_rich_captions_text_prompts, i);
     $(id).parent().siblings().removeClass('active');
     $(id).parent().addClass('active');
     return false;
   });
  }

  for (let i = 1; i <= 2; i++) {
   let id = '#n2m-rich-captions-' + i;
   $(id).click(function() {
     generateLongFormTable('n2m-rich-captions', 'noise2music', 'rich-descriptions', noise2music_rich_captions, noise2music_rich_captions_text_prompts, i);
     $(id).parent().siblings().removeClass('active');
     $(id).parent().addClass('active');
     return false;
   });
  }

  for (let i = 1; i <= 4; i++) {
   let id = '#n2m-musical-attributes-' + i;
   $(id).click(function() {
     generateLongFormTable('n2m-musical-attributes', 'noise2music', 'musical-attributes', noise2music_musical_attributes, noise2music_musical_attributes_text_prompts, i);
     $(id).parent().siblings().removeClass('active');
     $(id).parent().addClass('active');
     return false;
   });
  }

  for (let i = 1; i <= 3; i++) {
   let id = '#n2m-musiccaps-' + i;
   $(id).click(function() {
     generateLongFormTable('n2m-musiccaps', 'noise2music', 'musiccaps', noise2music_musiccaps, noise2music_musiccaps_text_prompts, i);
     $(id).parent().siblings().removeClass('active');
     $(id).parent().addClass('active');
     return false;
   });
  }
  for (let i = 1; i <= 10; i++) {
    let id = '#melody-time-lapse-' + i;
    $(id).click(function() {
      generateTextPromptTable('melody-time-lapse', 'give_me_a_background_music_track', i);
      $(id).parent().siblings().removeClass('active');
      $(id).parent().addClass('active');
      return false;
    });
  }
  for (let i = 1; i <= 10; i++) {
    let id = '#melody-coffee-time-' + i;
    $(id).click(function() {
      generateTextPromptTable('melody-coffee-time', 'give_me_a_piece_of_music', i);
      $(id).parent().siblings().removeClass('active');
      $(id).parent().addClass('active');
      return false;
    });
  }
  for (let i = 1; i <= 5; i++) {
    let id = '#YFYFapDVOFHg-' + i;
    $(id).click(function() {
    generateMusicPromptTable('YFYFapDVOFHg', 'YFYFapDVOFHg', i);
      $(id).parent().siblings().removeClass('active');
      $(id).parent().addClass('active');
      return false;
    });
  }
  for (let i = 1; i <= 5; i++) {
    let id = '#YMHHshnnqyco-' + i;
    $(id).click(function() {
      generateMusicPromptTable('YMHHshnnqyco', 'YMHHshnnqyco', i);
      $(id).parent().siblings().removeClass('active');
      $(id).parent().addClass('active');
      return false;
    });
  }
  for (let i = 1; i <= 2; i++) {
    let id = '#ablation-angle-schedules-' + i;
    $(id).click(function() {
      generateAblationAngleScheduleTable('ablation-angle-schedules', i);
      $(id).parent().siblings().removeClass('active');
      $(id).parent().addClass('active');
      return false;
    });
  }

});
