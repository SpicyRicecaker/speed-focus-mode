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

function spdfReset() {
  spdfCurrentTimeout = null;
  spdfCurrentAction = null;
}

function spdfClearCurrentTimeout() {
  if (spdfCurrentTimeout != null) {
    clearTimeout(spdfCurrentTimeout);
  }
  if (spdfAutoAlertTimeout != null) {
    clearTimeout(spdfAutoAlertTimeout);
  }
}

function spdfSetAutoAlert(ms) {
  clearTimeout(spdfAutoAlertTimeout);
  spdfAutoAlertTimeout = setTimeout(pycmd, ms, "spdf:alert");
}

function spdfSetAutoAnswer(ms) {
  spdfReset();
  clearTimeout(spdfAutoAnswerTimeout);
  spdfAutoAnswerTimeout = setTimeout(pycmd, ms, "ans");
  spdfSetCurrentTimer(spdfAutoAnswerTimeout, "Reveal", ms);
}

function spdfSetAutoAction(ms, action) {
  spdfReset();
  clearTimeout(spdfAutoActionTimeout);
  spdfAutoActionTimeout = setTimeout(pycmd, ms, "spdf:action");
  spdfSetCurrentTimer(spdfAutoActionTimeout, action, ms);
}
