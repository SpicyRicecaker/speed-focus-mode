/*
# -*- coding: utf-8 -*-

# Speed Focus Mode Add-on for Anki
#
# Copyright (C) 2017-2021  Aristotelis P. <https://glutanimate.com/>
#
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU Affero General Public License as
# published by the Free Software Foundation, either version 3 of the
# License, or (at your option) any later version, with the additions
# listed at the end of the license file that accompanied this program.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU Affero General Public License for more details.
#
# You should have received a copy of the GNU Affero General Public License
# along with this program.  If not, see <https://www.gnu.org/licenses/>.
#
# NOTE: This program is subject to certain additional terms pursuant to
# Section 7 of the GNU Affero General Public License.  You should have
# received a copy of these additional terms immediately following the
# terms and conditions of the GNU Affero General Public License that
# accompanied this program.
#
# If not, please request a copy through one of the means of contact
# listed here: <https://glutanimate.com/contact/>.
#
# Any modifications to this file must keep this entire header intact.
*/


var spdfAutoAlertTimeout = 0;
var spdfAutoAnswerTimeout = 0;
var spdfAutoActionTimeout = 0;
var spdfCurrentTimeout = null;
var spdfCurrentAction = null;
// var spdfCurrentInterval = null;
var spdfCurrentTimer = null;
var running = false;

function spdfReset() {
  clearTimeout(spdfCurrentTimer);
  spdfCurrentTimeout = null;
  spdfCurrentAction = null;
}

// runs `tick()` and `render()` for the countdown timer
function spdfUpdateTime(past) {
  if (!running) {
    return;
  }
  const date = new Date();
  spdfTimeLeft = timeLeft - (date.getTime() - past.getTime());
  spdfDisplayTime();

  if (timeLeft < 0) {
    // no need to update timer if time is already 0
    timeNode.textContent = "";
    running = false;
  } else {
    timerId = setTimeout(spdfUpdateTime, 1000, date);
  }
}

function spdfDisplayTime() {
  // the timer on the bottom right of the screen
  var time = Math.round(spdfTimeLeft / 1000);
  // minutes
  var m = Math.floor(time / 60);
  // seconds
  var s = time % 60;
  document.getElementById("spdfTime").textContent = `${spdfCurrentAction} ${m}:${s < 10 ? "0" : ""}${s}`;
}

function spdfSetCurrentTimer(timeout, action, ms) {
  // assign action (i.e. 'good' or 'next', etc.)
  spdfCurrentAction = action;
  // the amount of seconds at which point to ignore the answer
  spdfCurrentTimeout = timeout;

  // update time left
  spdfTimeLeft = ms;
  // rewrite timer
  running = true;
  // spdfCurrentTimer = spdfUpdateTime(new Date());
  document.getElementById("spdfTime").textContent = `${spdfCurrentAction} ${m}:${s < 10 ? "0" : ""}${s}`;
}

function spdfClearCurrentTimeout() {
  if (spdfCurrentTimeout != null) {
    clearTimeout(spdfCurrentTimeout);
  }
  if (spdfAutoAlertTimeout != null) {
    clearTimeout(spdfAutoAlertTimeout);
  }
  clearTimeout(spdfCurrentTimer);

  document.getElementById("spdfTime").textContent = "Stopped.";
  $("#ansbut").focus();
  $("#defease").focus();
}

function spdfSetAutoAlert(ms) {
  clearTimeout(spdfAutoAlertTimeout);
  spdfAutoAlertTimeout = setTimeout(pycmd, ms, "spdf:alert");
}

function spdfSetAutoAnswer(ms) {
  spdfReset();
  clearTimeout(spdfAutoAnswerTimeout);
  spdfAutoAlertTimeout = setTimeout(pycmd, ms, "ans");
  spdfSetCurrentTimer(spdfAutoAnswerTimeout, "Reveal", ms);
}

function spdfSetAutoAction(ms, action) {
  spdfReset();
  clearTimeout(spdfAutoActionTimeout);
  spdfAutoAlertTimeout = setTimeout(pycmd, ms, "spdf:action");
  spdfSetCurrentTimer(spdfAutoActionTimeout, action, ms);
}

function spdfHide() {
  document.getElementById("spdfControls").style.display = "none";
}

function spdfShow() {
  document.getElementById("spdfControls").style.display = "";
}

const spdfButtonHTML = `
<td id="spdfControls" width="50" align="center" valign="top" class="stat">
<span id="spdfTime" class="stattxt"></span><br>
<button title="Shortcut key: ${window.spdfHotkeyMoreTime}"
    onclick="spdfClearCurrentTimeout();">More time!</button>
</td>
`;

document
  .getElementById("middle")
  .insertAdjacentHTML("afterend", spdfButtonHTML);