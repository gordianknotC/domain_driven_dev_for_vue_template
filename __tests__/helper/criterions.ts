import { CriterionCreator } from "~/store/form/criterionCreator";
import { TPostCriterionPayload } from "~/types/apiTypes";
import { CriterionFormInput } from "~/store/form/criterionCreatorInterface";


export
class CriterionTestHelper{
  constructor(public creator: CriterionCreator) {
  }

  validateOnInputEntry(val: number, defaultState = {
    join_limit: 200,
    contest_size: 200,
    prize: 1000,
  }){
    const creator = this.creator;
    creator.input({
      ...defaultState,
      entry_plus: val
    });
    if (defaultState.join_limit >= defaultState.contest_size)
      expect(creator.state.join_limit).toBe(defaultState.contest_size - 1);
    else
      expect(creator.state.join_limit).toBe(defaultState.join_limit)
    expect(creator.state.contest_size).toBe(defaultState.contest_size);
    expect(creator.state.prize).toBe(defaultState.prize);

    expect(creator.computed.entry_calc).toBe((creator.state.prize * (creator.fee / 100 + 1)) / creator.state.contest_size);
    expect(creator.computed.entry).toBe(
      creator.computed.entry_calc + creator.state.entry_plus
    );
    //expect(creator.state.entry_display).toBe(val);
    if (val > creator.computed.entry_calc){
      expect(creator.state.entry_plus).toBe(val - creator.computed.entry_calc);
    }else{
      expect(creator.state.entry_plus).toBe(creator.computed.entry_calc);
    }
  }

  validateOnInputJoinLmit(val: number){
    const creator = this.creator;
    const origContestSize = creator.state.contest_size;
    creator.input({ join_limit: val });
    if ( val < origContestSize ) {
      expect(creator.state.contest_size).toBe(origContestSize);
      expect(creator.state.join_limit).toBe(val);
    } else {
      expect(creator.state.contest_size).toBe(val + 1);
      expect(creator.state.join_limit).toBe(val);
    }
  }

  validateOnInputContestSize(val: number){
    const creator = this.creator;
    const origJoinLimit = creator.state.join_limit;
    creator.input({ contest_size: val });
    if (val > origJoinLimit) {
      expect(creator.state.contest_size).toBe(val);
      expect(creator.state.join_limit).toBe(origJoinLimit);
    } else {
      expect(creator.state.join_limit).toBe(val - 1);
      expect(creator.state.contest_size).toBe(val);
    }
  }

  addRanking(option: {
    lbound?: number, rbound?: number, amount?: number,
    state?: CriterionFormInput,
    assert: {
      availablePrize: number,
      undistributed: number,
      sum: number,
      winners: number,
      canAppendNewRow: boolean,
      prize_setting: Record<string, number>,
      expectAdded: boolean,
      payload?: TPostCriterionPayload,
    }
  }): void{
    this.creator.input(option.state ?? {});
    const rankingCreator = this.creator.rankingCreator;
    const originalRankingLength = rankingCreator.state.rankingList.length;
    const {lbound, rbound, amount, assert} = option;
    if (originalRankingLength == 0){
      expect(rankingCreator.computed.canAppendNewRow).toBeTruthy();
    }

    const row = rankingCreator.addRankingByNumber(lbound, rbound, amount);

    if (option.assert.expectAdded){
      expect(rankingCreator.state.rankingList.length).toBe(originalRankingLength+1);
      expect(row?.computed.availablePrize).toBe(assert.availablePrize);
      expect(row?.state.amount).toBe(amount);

      expect(rankingCreator.computed.sum).toBe(assert.sum);
      expect(rankingCreator.computed.winners).toBe(assert.winners);

      expect(rankingCreator.computed.undistributed).toBe(assert.undistributed);
      expect(rankingCreator.computed.canAppendNewRow).toBe(assert.canAppendNewRow);

      const prize_setting = rankingCreator.computed.prize_setting;
      // todo: prize_setting validation
      // expect(prize_setting).toEqual(option.assert.prize_setting);

      if (option.assert.payload){
        const payload = this.creator.computed.payload;
        expect(payload).toEqual(option.assert.payload!);
      }
    }else{
      expect(row).toBe(null);
    }
  }

  modifyRanking(option: {
    lbound?: number, rbound?: number, amount?: number,
    rankingIndex: number,
    assert:{
      lbound: number,
      rbound: number,
      prevL: number,
      prevR: number,
      // canAppendNewRow: boolean,
      // sum: number,
    }
  }){
    const row = this.creator.rankingCreator.state.rankingList[option.rankingIndex];
    const assert = option.assert;
    row.input(option as any);

    expect(row.state.lbound).toBe(assert.lbound);
    expect(row.state.rbound).toBe(assert.rbound);
    expect(row.computed.prevChain!.state.lbound).toBe(assert.prevL);
    expect(row.computed.prevChain!.state.rbound).toBe(assert.prevR);
  }

  removeLastRanking(    assert: {
    availablePrize: number,
    undistributed: number,
    sum: number,
    winners: number,
    canAppendNewRow: boolean,
  }): void{
    const lastRanking = this.creator.rankingCreator.state.rankingList[this.creator.rankingCreator.state.rankingList.length - 1];
    const origLength = this.creator.rankingCreator.state.rankingList.length;
    const lastIdx = origLength - 2;

    this.creator.rankingCreator.removeRanking(lastRanking as any);
    expect(this.creator.rankingCreator.computed.sum).toBe(assert.sum);
    expect(this.creator.rankingCreator.computed.undistributed).toBe(assert.undistributed);
    expect(this.creator.rankingCreator.state.rankingList.length).toBe(origLength - 1);
    expect(this.creator.rankingCreator.state.rankingList[lastIdx].computed.availablePrize).toBe(assert.availablePrize);
    expect(this.creator.rankingCreator.computed.canAppendNewRow).toBeTruthy();
  }
}

