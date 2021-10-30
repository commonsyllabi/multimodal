# Multimodal
Desktop app for teaching

**Multimodal is under active development (v0.2.2)**

## ABOUT

Please visit the OpenSyllabi website at [https://opensyllabi.github.io/multimodal](https://opensyllabi.github.io/multimodal) to learn more about the project.

## FEATURES

- Seamless editing of notes during class time - *take into account what students discuss, rather than sticking to static slides*
- Interacting with your lesson as if it were a whiteboard - *no more pacing back and forth between whiteboard and laptop*
- Hyperlinking of slides - *refer to content that was previously discussed*
- Semantic structure adapted to class preparation and class reviews - *provide more context than bare presenter notes*
- HTML and PDF export with different structures and layouts - *export a simple webpage or a whole textbook*

## HOW TO

Multimodal is composed of a **BOARD PAGE**, in which you can see, create, edit and open syllabi, and of a **TOPIC PAGE**, where you can create and display lessons interactively.

### BOARD PAGE

#### DISPLAY A SYLLABUS

![main board page with topics](https://github.com/opensyllabi/multimodal/blob/dev/docs/tutorial_board_1.png)


#### DISPLAY THE TOPICS AND SESSIONS

![main board page](https://github.com/opensyllabi/multimodal/blob/dev/docs/tutorial_board_2.png)

### TOPIC PAGE

To enter Edit Mode, click on `File > Toggle Edit...` or press `CMD+E`.

#### DISPLAY MODE

![topic page](https://github.com/opensyllabi/multimodal/blob/dev/docs/tutorial_topic_display.png)

#### EDIT MODE

![topic page in edit mode](https://github.com/opensyllabi/multimodal/blob/dev/docs/tutorial_topic.png)

## Install

### User

Stable release coming soon. In the meantime, download the [latest beta version](https://github.com/opensyllabi/multimodal/releases) or start this repository to receive the latest updates.

### Developer

#### Requirements

- [NodeJS](https://nodejs.org/en/) v8.11 or higher
- (recommended) [yarn](https://yarnpkg.com/lang/en/) v.1.17 or higher


#### Steps

- `git clone https://github.com/periode/multimodal.git`
- `cd multimodal`
- `yarn` or `npm install`
- `npm run pack`
- `npm run start`
