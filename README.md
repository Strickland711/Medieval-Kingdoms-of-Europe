# Web-game 中欧风云
游戏规则
一、	开局
初始状态下，双方各自拥有1张国王、1张将军、2张领主、3张骑士、3张刺客作为人物牌（character）；以及3张金钱、3张公信力、1张身无长物作为物资牌（resource）。
二、	出牌规则
玩家需选择自己拥有的人物牌（character）和物资牌（resource）各1张，点击“确定出牌”以开始回合判定。特别地，玩家选择刺客时物资牌只能选择身无长物；玩家选择身无长物后人物牌只能是刺客。
人物大小关系：国王>将军>领主>骑士>刺客，特别地，刺客可以刺杀对方存活角色中地位最高者。
三、	回合判定
玩家确认出牌后，系统进行回合判定流程。回合判定分为有刺客和没刺客两种情况：
（一）有刺客情况
（1）若双方都为刺客则直接进入下一回合；
（2）若一方存在刺客，另一方在其存活角色中地位最高，则该角色被刺客刺杀；
（3）若不是以上两种情况，非刺客方角色为将军/骑士，检测其物资牌，若为金钱，刺客被杀；若为公信力，刺客被收服；
（4）若不是以上三种情况（非刺客方角色为国王/领主）检测其物资牌，若为金钱，激发收买判定（50%概率），成功则收买刺客，非刺客方获得刺客方的金钱，失败则杀死刺客；若为公信力，刺客被杀。
（二）无刺客情况
检测双方人物地位大小：
（1）双方角色相同，直接进入下一回合；
（2）一方地位高，双方物资相同，地位低者被杀；
（3）一方地位高，地位高者带金钱，地位低者带公信力，激发收买判定（50%概率），成功则收买地位低者，地位低者获得地位高者的金钱，失败则杀死地位低者，地位高者公信力-1；
（3）一方地位高，地位高者带公信力，地位低者带金钱，激发贿赂判定（50%概率），成功则地位高者获得地位低者的金钱，失败则地位低者被杀，地位高者公信力+1。
四、	结束条件
（1）当一方失去全部领主，将军，国王时，则游戏结束，该方失败。
（2）当一方失去全部公信力时，则游戏结束，该方失败。
（3）当一方失去全部金钱时，则游戏结束，该方失败。
