$(document).ready(function(){
  $(".and_table" ).click(function() {
      reset(and_gate)
      fall_loop(and_gate)
  });

  $("#and0" ).hover(function() {
    clearStarting(and_gate);
  });

  $("#and1" ).hover(function() {
      clearStarting(and_gate);
      and_gate.dominos[0].setStarting(true);
  });

  $("#and2" ).hover(function() {
    clearStarting(and_gate);
    and_gate.dominos[6].setStarting(true);
  });

  $("#and3" ).hover(function() {
    clearStarting(and_gate);
    and_gate.dominos[0].setStarting(true);
    and_gate.dominos[6].setStarting(true);
  });

  $(".or_table" ).click(function() {
      reset(or_gate)
      fall_loop(or_gate)
  });

  $("#or0" ).hover(function() {
    clearStarting(or_gate);
  });

  $("#or1" ).hover(function() {
      clearStarting(or_gate);
      or_gate.dominos[22].setStarting(true);
  });

  $("#or2" ).hover(function() {
    clearStarting(or_gate);
    or_gate.dominos[0].setStarting(true);
  });

  $("#or3" ).hover(function() {
    clearStarting(or_gate);
    or_gate.dominos[0].setStarting(true);
    or_gate.dominos[22].setStarting(true);
  });

  $(".not_table" ).click(function() {
      reset(not_gate)
      not_gate.dominos[6].setStarting(true);
      fall_loop(not_gate)
  });

  $("#not0" ).hover(function() {
    clearStarting(not_gate);
    not_gate.dominos[6].setStarting(true);
  
  });

  $("#not1" ).hover(function() {
      clearStarting(not_gate);
      not_gate.dominos[6].setStarting(true);

      not_gate.dominos[0].setStarting(true);
  });

  $(".nand_table" ).click(function() {
    reset(nand_gate)
    nand_gate.dominos[48].setStarting(true);
    fall_loop(nand_gate)
  });

  $("#nand0" ).hover(function() {
    clearStarting(nand_gate);
    nand_gate.dominos[48].setStarting(true);

  });

  $("#nand1" ).hover(function() {
    clearStarting(nand_gate);
    nand_gate.dominos[48].setStarting(true);
    nand_gate.dominos[43].setStarting(true);
  });

  $("#nand2" ).hover(function() {
  clearStarting(nand_gate);
  nand_gate.dominos[48].setStarting(true);
  nand_gate.dominos[0].setStarting(true);
  });

  $("#nand3" ).hover(function() {
    clearStarting(nand_gate);
    nand_gate.dominos[48].setStarting(true);
    nand_gate.dominos[0].setStarting(true);
    nand_gate.dominos[43].setStarting(true);
  });
});