import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import Editor from "../utilities/Editor/index.js";

const editorExamples = {
  large: {
    html: `<h2>Nausicaä and the Stranger</h2>
      <p>On the shore of Scheria, <strong>Nausicaä</strong> encounters a shipwrecked stranger: Odysseus, exhausted after days at sea. Their meeting is one of the Odyssey’s most quietly generous moments—a story about <span style="color: #1e66f5">hospitality</span>, courage, and the first steps toward home.</p>
      <h3>A welcome before a name</h3>
      <p>Rather than turning away, the princess offers practical help and a safe route to the city. Her <u>thoughtful welcome</u> becomes a turning point: what could have been a dangerous encounter instead opens a path to safety. The scene has inspired artists for centuries, each imagining the delicate balance between a stranger’s vulnerability and his hosts’ kindness.</p>
      <blockquote><p>“A stranger and a suppliant are as sacred as a brother.”</p></blockquote>
      <p>Before she leaves, Nausicaä gives Odysseus clear directions and asks him to approach the city on his own. The advice protects them both from gossip, while still ensuring that he reaches the palace. <mark data-color="#f9e2af" style="background-color: #f9e2af; color: inherit">A small act of care changes the direction of an entire journey.</mark></p>
      <h3>The journey onward</h3>
      <p>With the princess’s help, Odysseus reaches the Phaeacian court and finally has the chance to tell his story. The old plan to <s>travel alone without help</s> gives way to a safer passage home. Read more in <a href="https://www.worldhistory.org/Odysseus/" target="_blank" rel="noopener noreferrer">this introduction to Odysseus</a>.</p>
      <p>The episode’s key moments:</p>
      <ol><li>Nausicaä finds Odysseus at the shore.</li><li>She offers food, clothing, and guidance.</li><li>He reaches the palace and earns passage home.</li></ol>
      <p>The story also celebrates a few simple virtues:</p>
      <ul><li>Offer help to a stranger in need.</li><li>Give clear advice, not just good intentions.</li><li>Make room for trust to grow.</li></ul>
      <table><tbody><tr><th>Moment</th><th>What it offers</th></tr><tr><td>At the shore</td><td>Care and a first welcome</td></tr><tr><td>On the road</td><td>Practical guidance</td></tr><tr><td>At the palace</td><td>A safe passage home</td></tr></tbody></table>
      <p><em>Explore how this encounter has been retold across art and literature.</em></p>
      <p><img src="/images/m.-heinrich-eddelein-nausikaa-and-her-maids-bringing-clothes-to-odysseus.jpg" alt="Nausicaä and her companions meet Odysseus at the shore" /></p>`,
    placeholder: "Write something…",
  },
  medium: {
    html: "<p>Format a note, add a table, or insert media.</p>",
    placeholder: "Write a note…",
  },
  small: {
    html: "<p>Add a short comment or attach an image.</p>",
    placeholder: "Write a comment…",
  },
  mini: {
    html: "<p>Type a short note, then press Enter to finish.</p>",
    placeholder: "Type a short note…",
  },
};

const Demo = ({ size }) => {
  const [state, setState] = useState({ ...editorExamples[size], text: "" });
  const [saved, setSaved] = useState(false);
  const updateState = (nextState) => {
    setState(nextState);
    setSaved(false);
  };

  return (
    <div>
      <Editor
        editorSize={size}
        initState={state}
        updateState={updateState}
        syncState={() => setSaved(true)}
        placeholder={editorExamples[size].placeholder}
      />
      {size === "mini" && (
        <small className="editor-demo-save-status">
          {saved ? "Note saved." : "Press Enter to finish the note."}
        </small>
      )}
    </div>
  );
};

for (const [target, size] of [["editor-demo-large", "large"], ["editor-demo-medium", "medium"], ["editor-demo-small", "small"], ["editor-demo-mini", "mini"]]) {
  const element = document.getElementById(target);
  if (element) createRoot(element).render(<Demo size={size} />);
}
